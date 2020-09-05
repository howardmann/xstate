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
    status: 'In Progress',
    comment: ''
  },
  states: {
    idle: {
      on: {
        click: 'status'
      }
    },
    commentInput: {
      initial: 'focus',
      states: {
        focus: {
          on: {
            SUBMIT: '#machine.status'
          }
        },
        blur: {}
      },
      on: {
        CLOSE: 'status'
      }
    },
    status: {
      initial: 'boot',
      states: {
        boot: {
          on: {
            INIT: [{
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
            APPROVE: 'inProgress',
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
            RESOLVED: 'resolved'
          },
          entry: assign({
            status: 'In Progress'
          })
        },
        onHold: {
          on: {
            APPROVE: 'inProgress',
            REJECT: 'notDoing'
          },
          entry: assign({
            status: 'On Hold'
          })
        },
        notDoing: {
          on: {
            APPROVE: 'inProgress',
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
      },
      on: {
        CLOSE: 'idle',
        ADD_COMMENT: 'commentInput'
      }
    }
  }
});


export default actionMachine