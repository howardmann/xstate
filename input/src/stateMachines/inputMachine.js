import {Machine, assign} from 'xstate'

const assignBorderColor = (color) => assign({
  border: `3px solid ${color}`
})

const inputMachine = Machine({
  initial: 'input',
  context: {
    border: '1px solid white'
  },
  states: {
    input: {
      initial: 'enabled',
      context: {
        border: '1px solid white'
      },
      states: {
        enabled: {
          on: {
            'MOUSE_ENTER': 'hover'
          },
          entry: assignBorderColor('black')
        },
        hover: {
          on: {
            'CLICK': 'focused',
            'MOUSE_LEAVE': 'enabled'
          },
          entry: assignBorderColor('blue')
        },
        focused: {
          on: {
            'BLUR': 'enabled'
          },
          entry: assignBorderColor('green')
        }
      },
      on: {
        FOCUS: 'input.focused'
      }
    }
  }
});

export default inputMachine