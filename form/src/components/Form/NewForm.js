import React from 'react';

const NewForm = (props) => (
  <div>
    <h3>New Form</h3>
    <input type="text" name="name" onChange={props.handleChange} value={props.name} placeholder="enter name"/>
    <br/>
    <input type="number" name="age" onChange={props.handleChange} value={props.age} placeholder="enter age"/>
    <br/>
    <button onClick={() => props.handleSubmit()}>
      Submit
    </button>
  </div>
)

export {NewForm}