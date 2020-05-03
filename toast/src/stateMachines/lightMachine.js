let {Machine, interpret} = require('xstate')

const triggerCB = (_ctx, evt) => evt.cb && evt.cb()

const lightMachine = Machine({
  initial: 'light',
  states: {
    light: {
      initial: 'active',
      states: {
        active: {
          on: {
            TOGGLE: 'inactive'
          }
        },
        inactive: {
          on: {
            TOGGLE: 'active'
          }
        }
      },
      on: {
        BREAK: {
          target: 'broken',
          actions: triggerCB
        }
      }
    },
    broken: {
      on: {
        REPAIR: {
          target: 'light',
          actions: triggerCB
        }
      }
    }
  }
});

export default lightMachine

// const myToggleMachine = interpret(toggleMachine).onTransition(state => {
//   console.log(state.value);
// }).start()

// const customCB = (msg) => {
//   return () => console.log('my custom cb', msg)
// }

// myToggleMachine.send('TOGGLE')
// myToggleMachine.send('TOGGLE')
// myToggleMachine.send('TOGGLE', {cb: customCB('magic message')})

