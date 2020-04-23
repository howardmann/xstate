import {Machine} from 'xstate'

const FormMachine = Machine({
  id: 'form-machine',
  initial: "form",
  states: {
    form: {
      states: {
        new: {
          type: "final"
        },
        error: {
          type: "final"
        }
      },
      initial: "new",
      on: {
        SUBMIT: "loading"
      }
    },
    loading: {
      on: {
        RESOLVE: "success",
        REJECT: "form.error"
      }
    },
    success: {
      on: {
        RETRY: "form.new"
      }
    }
  }
});
// const FormService = interpret(FormMachine).onTransition(state => {
//   console.log(state.value);
// })


export {FormMachine}

// const current = FormMachine.initialState
// console.log(current.value);
// FormService.start()
// {form: 'new'}
// FormService.send('SUBMIT') 
// loading
// FormService.send('RESOLVE')
// success
// FormService.send('RETRY')
// {form: 'new'}
// FormService.send('SUBMIT')
// loading
// FormService.send('REJECT')
// {form: 'error'}
// FormService.send('SUBMIT')
// loading
// FormService.send('REJECT')
// {form: 'error'}
// FormService.send('SUBMIT')
// loading
// FormService.send('RESOLVE')
// success