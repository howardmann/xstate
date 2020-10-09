import {Machine, assign, send} from 'xstate'

const isNew = (ctx) => ctx.status === 'New'
const isInProgress = (ctx) => ctx.status === 'In Progress'
const isResolved = (ctx) => ctx.status === 'Resolved'
const isOnHold = (ctx) => ctx.status === 'On Hold'
const isNotDoing = (ctx) => ctx.status === 'Not Doing'
const markHasCommentsTrue = (ctx, evt) => ctx.hasComments = true

const actionMachine = Machine({
  id: 'machine',
  initial: 'actions',
  type: 'parallel',
  context: {
    status: 'New',
    hasComments: false,
    category: 'previous'
  },
  states: {
    category: {
      initial: 'load',
      states: {
        load: {
          on: {
            "": [{
              target: 'inbox',
              cond: ctx => ctx.category === 'inbox'
            }, {
              target: 'previous',
              cond: ctx => ctx.category === 'previous'
            }]
          }
        },
        inbox: {
          entry: assign({
            category: 'inbox'
          }),
          on: {
            MARK_READ: {
              target: 'previous',
              cond: ctx => !isNew(ctx)
            }
          }
        },
        previous: {
          entry: assign({
            category: 'previous'
          }),
          on: {
            MARK_UNREAD: {
              target: 'inbox',
            }
          }
        }
      }
    },
    issue: {
      initial: 'inactive',
      states: {
        inactive: {
          on: {
            TOGGLE: 'active'
          }
        },
        active: {
          on: {
            TOGGLE: {
              target: 'inactive',
              actions: [send('HIDE_DETAILS'), send('HIDE_COMMENTS')]
            }
          }
        }
      },
      on: {
        HIDE_ISSUE: {
          target: 'issue.inactive',
          actions: [send('HIDE_DETAILS'), send('HIDE_COMMENTS')]
        }
      }
    },
    details: {
      initial: 'preview',
      states: {
        preview: {
          on: {
            TOGGLE_DETAILS: 'expanded'
          }
        },
        expanded: {
          on: {
            TOGGLE_DETAILS: 'preview'
          }
        }
      },
      on: {
        HIDE_DETAILS: 'details.preview'
      }
    },
    comments: {
      initial: 'preview',
      states: {
        preview: {
          initial: 'load',
          states: {
            load: {
              on: {
                "": [{
                  target: 'comment',
                  cond: ctx => ctx.hasComments === true
                }, {
                  target: 'formPlaceholder',
                  cond: ctx => ctx.hasComments === false
                }]
          }              
            },
            comment: {},
            formPlaceholder: {
              on: {
                FOCUS: '#machine.comments.expanded.formNew'
              }
            }
          },
          on: {
            TOGGLE_COMMENTS: {
              target: 'expanded',
              actions: [send('HIDE_DETAILS')]
            }
          }
        },
        expanded: {
          initial: 'formNew',
          states: {
            formPlaceholder: {
              on: {
                FOCUS: 'formNew'
              }
            },
            formNew: {
              on: {
                CANCEL: 'formPlaceholder',
                SUBMIT_COMMENT: {
                  target: 'formPlaceholder',
                  actions: [markHasCommentsTrue, send('MARK_READ')]
                }
              }
            }
          },
          on: {
            TOGGLE_COMMENTS: 'preview'
          }
        }
      },
      on: {
        HIDE_COMMENTS: 'comments.preview'
      }
    },
    email: {
      initial: 'inactive',
      states: {
        inactive: {
          on: {
            OPEN_EMAIL: 'active'
          }
        },
        active: {
          on: {
            CLOSE_EMAIL: 'inactive',
            SUBMIT_EMAIL: [{
              target: '#machine.status.inProgress',
              actions: [send('HIDE_EMAIL'), send('MARK_READ')],
              cond: ctx => isNew(ctx) || isOnHold(ctx) || isNotDoing(ctx)
            },{
              actions: [send('HIDE_EMAIL')],
              cond: ctx => isInProgress(ctx) || isResolved(ctx)
            }]
          }
        }
      },
      on: {
        HIDE_EMAIL: 'email.inactive'
      }

    },
        status: {
          initial: 'load',
          states: {
            load: {
              on: {
                "": [{
                    target: 'new',
                    cond: ctx => isNew(ctx)
                  },
                  {
                    target: 'inProgress',
                    cond: ctx => isInProgress(ctx)
                  },
                  {
                    target: 'resolved',
                    cond: ctx => isResolved(ctx)
                  },
                  {
                    target: 'onHold',
                    cond: ctx => isOnHold(ctx)
                  },
                  {
                    target: 'notDoing',
                    cond: ctx => isNotDoing(ctx)
                  }
                ]
              }
            },
            new: {
              on: {
                APPROVE: {
                  actions: send('OPEN_EMAIL')
                },
                REJECT: {
                  target: 'notDoing',
                  actions: send('MARK_READ')
                },
                HOLD: {
                  target: 'onHold',
                  actions: send('MARK_READ')
                }
              },
              entry: [assign({
                status: 'New'
              }), send('MARK_UNREAD')]
            },
            inProgress: {
              on: {
                REJECT: {
                  target: 'notDoing',
                  actions: send('MARK_READ')
                },
                HOLD: {
                  target: 'onHold',
                  actions: send('MARK_READ')
                },
                RESOLVED: {
                  target: 'resolved',
                  actions: send('MARK_READ')
                }
              },
              entry: assign({
                status: 'In Progress'
              })
            },
            onHold: {
              on: {
                APPROVE: {actions: [send('OPEN_EMAIL')]},
                REJECT: {
                  target: 'notDoing',
                  actions: send('MARK_READ')
                }
              },
              entry: assign({
                status: 'On Hold'
              })
            },
            notDoing: {
              on: {
                APPROVE: {actions: [send('OPEN_EMAIL')] },
                HOLD: {
                  target: 'onHold',
                  actions: send('MARK_READ')
                }
              },
              entry: assign({
                status: 'Not Doing'
              })
            },
            resolved: {
              type: 'final',
              entry: assign({
                status: 'Resolved'
              })
            }
          }
        }
      }
});


export default actionMachine