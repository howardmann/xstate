import {Machine, assign, send} from 'xstate'

const isNew = (ctx) => ctx.status === 'New'
const isInProgress = (ctx) => ctx.status === 'In Progress'
const isResolved = (ctx) => ctx.status === 'Resolved'
const isOnHold = (ctx) => ctx.status === 'On Hold'
const isNotDoing = (ctx) => ctx.status === 'Not Doing'


const actionMachine = Machine({
  id: 'machine',
  initial: 'actions',
  type: 'parallel',
  context: {
    status: 'In Progress',
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
          initial: 'formPlaceholder',
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
                  actions: (ctx, evt) => ctx.hasComments = true
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
    actions: {
      initial: 'status',
      states: {
        status: {
          initial: 'load',
          entry: send('HIDE_ISSUE'),
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
                APPROVE: '#machine.actions.email',
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
                APPROVE: '#machine.actions.email',
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
                APPROVE: '#machine.actions.email',
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
        },
        email: {
          entry: send('HIDE_ISSUE'),
          on: {
            CLOSE: 'status',
            SUBMIT: {
              target: 'status',
              actions: [assign({
                status: 'In Progress'
              }), send('MARK_READ')]
            }
          }
        }
      }
    }
  }
});


export default actionMachine