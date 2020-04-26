import React from 'react';

const ErrorForm = (props) => (
  <div>
    <h3>Error Form</h3>
    {props.error.nameError && <p style={{color: "red"}}>! {props.error.nameError}</p>}  
    <input style={{ border: props.error.nameError ? '1px solid red' : '1px solid green'}} type="text" name="name" onChange={props.handleChange} value={props.name} placeholder="enter name"/>
    {props.error.nameError ? <span> ❌</span> : <span> ✅</span>}
    <br/>
    {props.error.ageError && <p style={{color: "red"}}>! {props.error.ageError}</p>}
    <input style={{ border: props.error.ageError ? '1px solid red' : '1px solid green'}} type="number" name="age" onChange={props.handleChange} value={props.age} placeholder="enter age"/>
    {props.error.ageError ? <span> ❌</span> : <span> ✅</span>}
    <br/>
    <button onClick={() => props.handleSubmit()}>
      Submit
    </button>

  </div>
)

export {ErrorForm}