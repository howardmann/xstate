import React, {useState, useEffect} from 'react'
import { useMachine } from "@xstate/react";
import inputMachine from './stateMachines/inputMachine'
import formMachine from './stateMachines/formMachine'

const ErrorMessage = (props) => (
  <span>    
    {
      props.error ? ` ❌ ${props.error}` : " ✅"
    }
  </span>
)

const Input = (props) => {
  const [currentInput, sendInput] = useMachine(inputMachine)
  const {value, name, type, handleInputChange, error, label, formError} = props

  return (
    <div style={{border: '1px solid grey', margin: '5px', padding: '5px'}}>      
      <label>
        <p>{label}</p>
      </label>
      <input      
        type={type}
        name={name}
        style={{border: currentInput.context.border, outline: 'none'}}
        value={value}
        onChange={handleInputChange}
        onMouseEnter={() => sendInput('MOUSE_ENTER')}
        onMouseLeave={() => sendInput('MOUSE_LEAVE')}
        onFocus={() => sendInput('FOCUS')}
        onClick={() => sendInput('CLICK')}
        onBlur={() => sendInput('BLUR')}
        onKeyDown={(e) => {
          e.keyCode === 13 && sendInput('BLUR')
        }}
      />
      <span>
        { 
          (value !== null) &&
          <ErrorMessage error={error}/>
        }
      </span>
      <div style={{backgroundColor: 'gainsboro', fontSize: '10px'}}>
        <p>props: {JSON.stringify(props)}</p>
        <p>value: {JSON.stringify(currentInput.value)}</p>
        <p>context: {JSON.stringify(currentInput.context)}</p>
      </div>
    </div>
  )
}

const validate = ({username, age}) => {
  let error ={}
  
  if (!username) {
    error.usernameError = "Username cannot be blank"
  }
  
  if (username && username.length < 5) {
    error.usernameError = "Username insufficient length"
  }
  if (!age) {
    error.ageError = "Cannot be blank"
  }
      
  if (age && +age < 21) {
    error.ageError = "Underage"
  }

  if (Object.keys(error).length > 0) {
    return {error}
  }
  return true
}


const Form =  () => {
  const [input, setInput] = useState({username: null, age: null})
  const [error, setError] = useState({})
  const [currentForm, sendForm] = useMachine(formMachine)

  const validateInput = () => {
    setError({})
    let {username, age} = input
    let {error} = validate({username, age})
    setError(error)
  }

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })

  } 
  
  // Listen for changes in input and update
  useEffect(() => {
      validateInput()
  }, [input])

  const handleSubmit = async() => {    
    sendForm('SUBMIT')
    let wait = (ms)  => new Promise(resolve => setTimeout(resolve, ms))
    await wait(600)

    let {username, age} = input
    let {error} = validate({username, age})
    if (error) { sendForm('REJECT')}
    sendForm('RESOLVE')
  }

  const handleReset = () => {
    setInput({username: null, age: null})
    sendForm('RETRY')
  }

  return (
      <div>
        <p>Form</p>
        <p>input: {JSON.stringify(input)}</p>
        <p>error: {JSON.stringify(error)}</p>
        <p>current: {JSON.stringify(currentForm.value)}</p>
        
        {
          currentForm.matches('success') && 
          <p>SUCCESS YAY</p>
        }

        {
          currentForm.matches('loading') && 
          <p>...Loading</p>
        }

        {
          currentForm.matches('form') &&        
            <div style={{border: '1px solid rebeccapurple'}}>          
              <Input 
                label="User name"
                type="text" 
                name="username" 
                error={error && error.usernameError}
                value={input.username} 
                handleInputChange={handleInputChange}
              />
              
              <Input 
                label="Age"
                type="number" 
                name="age"
                error={error && error.ageError}
                value={input.age} 
                handleInputChange={handleInputChange}
              />          
              <button
                disabled={error ? true : false}
                onClick={() => handleSubmit()
              }>
                SUBMIT
              </button>
          </div>
        }

        {
          currentForm.matches('success') &&
          <button onClick={() => handleReset()}>RETRY</button>
        }

     </div>
  );
}

export default Form