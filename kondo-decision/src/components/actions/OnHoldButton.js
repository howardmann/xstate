import React from 'react'

export default ({send}) => {
    return (
        <button className="btn bg-yellow gray opacity-70"
        onClick={() => send('HOLD')}>On Hold</button>
    )
  }
  