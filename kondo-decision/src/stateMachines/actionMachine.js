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
    status: 'New',
    comment: ''
  },
  states: {
    issue: {
      initial: 'inactive',
      states: {
        inactive: { on: { TOGGLE: 'active' } },
        active: { on: { TOGGLE: 'inactive' } }
      },
      on: {
        HIDE_ISSUE: 'issue.inactive'
      }
    },
    actions: {
      initial: 'status',
      states: {
        status: {
          initial: 'load',
          entry: send('HIDE_ISSUE'),
          on: {
            ADD_COMMENT: '#machine.actions.comment.general'
          },        
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
                REJECT: 'notDoing',
                HOLD: 'onHold'
              },
              entry: assign({
                status: 'New'
              })
            },
            inProgress: {
              on: {
                REJECT: 'notDoing',
                HOLD: 'onHold',
                RESOLVED: {
                  target: '#machine.actions.comment.resolved'
                }
              },
              entry: assign({
                status: 'In Progress'
              })
            },
            onHold: {
              on: {
                APPROVE: '#machine.actions.email',
                REJECT: 'notDoing'
              },
              entry: assign({
                status: 'On Hold'
              })
            },
            notDoing: {
              on: {
                APPROVE: '#machine.actions.email',
                HOLD: 'onHold'
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
        comment: {
          initial: 'general',
          entry: send('HIDE_ISSUE'),
          on: {
            CLOSE: 'status',
            UPDATE_COMMENT: {
              actions: assign({
                comment: (_ctx, evt) => evt.comment
              })
            }
          },
          states: {
            general: {
              on: {
                SUBMIT: '#machine.actions.status'
              }
            },
            resolved: {
              on: {
                SUBMIT: '#machine.actions.status.resolved'
              }
            }
          }
        },
        email: {
          entry: send('HIDE_ISSUE'),
          on: {
            CLOSE: 'status',
            SUBMIT: {
              target: 'status',
              actions: assign({status: 'In Progress'})
            }
          }
        }
      }
    }
  }
});


export default actionMachine