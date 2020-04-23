import React from 'react';
import {interpret} from 'xstate'
import {FormMachine} from './FormMachine.js'

const NewForm = (props) => (
  <div>
    <p>New Form</p>
    <input type="text" name="name" onChange={props.handleChange} placeholder="enter name"/>
    <input type="number" name="age" onChange={props.handleChange} placeholder="enter age"/>
    <button onClick={() => props.handleSubmit()}>
      Submit
    </button>
  </div>
)

const ErrorForm = (props) => (
  <div>
    <p>Error Form</p>
    <input type="text" name="name" onChange={props.handleChange} placeholder="enter name"/>
    <input type="number" name="age" onChange={props.handleChange} placeholder="enter age"/>

    <button onClick={() => props.handleSubmit()}>
      Submit
    </button>

  </div>
)

const Success = (props) => (
  <div>
    <p>Success</p>
    <button onClick={() => props.send('RETRY')}>
      Retry
    </button>
  </div>
)

const Loading = (props) => (
  <div>
    <p>Loading...</p>
  </div>
)

class Form extends React.Component {
  state = {
    // // xstate current state value
    current: FormMachine.initialState,
    input: {name: null, age: null}
  }

  service = interpret(FormMachine).onTransition(current => 
    this.setState({current})
  )

  componentDidMount(){
    this.service.start()
  }

  componentWillUnmount(){
    this.service.stop()
  }

  handleChange = (e) => {
    this.setState({input: {...this.state.input,
      [e.target.name]: e.target.value
    }})
  }

  handleSubmit = () =>{
    let {send} = this.service
    send('SUBMIT')
    window.setTimeout(() => send('REJECT'), 1500)
  }
  
  
  render() {
    let {current, input} = this.state
    let {send} = this.service

    return (
      <div>
        <p>
          current: {JSON.stringify(current.value)}
        </p>
        <p>
          input: {JSON.stringify(input)}
        </p>
        
        {current.matches('form.new') && <NewForm handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>}
        {current.matches('form.error') && <ErrorForm handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>}
        {current.matches('loading') && <Loading/>}
        {current.matches('success') && <Success send={send}/>}

      </div>
    );
  }
}


export default Form;
