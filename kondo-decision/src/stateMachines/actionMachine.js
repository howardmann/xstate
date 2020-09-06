import {Machine, assign} from 'xstate'

const isNew = (ctx) => ctx.status === 'New'
const isInProgress = (ctx) => ctx.status === 'In Progress'
const isResolved = (ctx) => ctx.status === 'Resolved'
const isOnHold = (ctx) => ctx.status === 'On Hold'
const isNotDoing = (ctx) => ctx.status === 'Not Doing'


const actionMachine = Machine({
  id: 'machine',
  initial: 'status',
  context: {
    status: 'New',
    comment: ''
  },
  states: {
    comment: {
      initial: 'general',
      on: {
        CLOSE: '#machine.status',
        UPDATE_COMMENT: {
          actions: assign({
            comment: (_ctx, evt) => evt.comment
          })
        }
      },
      states: {
        general: {
          on: {
            SUBMIT: '#machine.status'
          }
        },
        resolved: {
          on: {
            SUBMIT: '#machine.status.resolved'
          }
        }
      }
    },
    status: {
      initial: 'load',
      on: {
        ADD_COMMENT: 'comment'
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
            APPROVE: '#machine.email',
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
              target: '#machine.comment.resolved'
            }
          },
          entry: assign({
            status: 'In Progress'
          })
        },
        onHold: {
          on: {
            APPROVE: '#machine.email',
            REJECT: 'notDoing'
          },
          entry: assign({
            status: 'On Hold'
          })
        },
        notDoing: {
          on: {
            APPROVE: '#machine.email',
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
    email: {
      on: {
        CLOSE: 'status',
        SUBMIT: {
          target: 'status',
          actions: assign({
            status: 'In Progress'
          })
        }
      }
    }
  }
});

export default actionMachine