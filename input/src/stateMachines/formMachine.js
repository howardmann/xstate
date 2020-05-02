import {Machine} from 'xstate'

const formMachine = Machine({
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

export default formMachine