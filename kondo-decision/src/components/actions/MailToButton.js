import React from 'react'

export default ({send}) => {
    return (
      <button className="btn bg-blue opacity-70" onClick={() => send('APPROVE')}>Email</button>
    )
  }
  