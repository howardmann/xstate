import React from 'react';
import {interpret} from 'xstate'
import {FormMachine} from '../../stateMachine/FormMachine.js'
import {NewForm} from './NewForm.js'
import {ErrorForm} from './ErrorForm.js'
import {Success} from './Success.js'
import {validateInput} from './validateInput'


class Form extends React.Component {
  state = {
    // // xstate current state value
    current: FormMachine.initialState,
    input: {name: null, age: null},
    error: {nameError: null, ageError: null}
  }

  baseState = this.state

  service = interpret(FormMachine).onTransition(current => 
    this.setState({current})
  )

  componentDidMount(){
    this.service.start()
  }

  componentWillUnmount(){
    this.service.stop()
  }

  handleChange = async (e) => {
    await this.setState({input: {...this.state.input,
      [e.target.name]: e.target.value
    }})
    this.validateInput()
  }
  
  resetError = () => {
    this.setState({error: {nameError: null, ageError: null}})
  }

  resetInput = () => {
    this.setState(this.baseState)
  }

  validateInput = () => {
    this.resetError()

    let {name, age} = this.state.input
    // Validate input and update error state if error
    let {error} = validateInput({name, age})
    if (error) {
      let {nameError = null, ageError} = error
      this.setState({error: {...this.state.error,
        nameError: nameError || null, 
        ageError: ageError || null
      }})
      return false
    }
    return true
  }

  handleSubmit = async () => {
    let {send} = this.service
    // Clear error message
    this.resetError()

    // Loading spinner simulate timeout
    send('SUBMIT')
    let wait = function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
    await wait(1000)

    // Validate input and update error state if error
    let validate = await this.validateInput()
    if (!validate) {
      return send('REJECT')
    }

    // Send success
    send('RESOLVE')
  }
  
  handleRetry = () => {
    this.resetInput()
    this.service.send('RETRY')
  }
  
  render() {
    let {current, input, error} = this.state
    
    return (
      <div>
        <p>
          current: {JSON.stringify(current.value)}
        </p>
        <p>
          input: {JSON.stringify(input)}
        </p>
        <p>
          error: {JSON.stringify(error)}
        </p>

        <div style={{border: "1px solid rebeccapurple", padding: '5px'}}>
          {current.matches('form.new') && <NewForm name={input.name} age={input.age} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>}
          {current.matches('form.error') && <ErrorForm error={error} name={input.name} age={input.age} validateInput={this.validateInput} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>}
          {current.matches('loading') && <p>...Loading</p>}
          {current.matches('success') && <Success handleRetry={this.handleRetry}/>}
        </div>
      </div>
    );
  }
}


export default Form;
