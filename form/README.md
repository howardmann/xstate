# XState Form

Demo link:
http://xstateform.surge.sh/

Form UI
![form-ui](formui.png)

XState Chart
https://xstate.js.org/viz/?gist=9c62ae09c3e50256a27a3857878f893a
![xstate-form](Form.png)

```javascript
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
```