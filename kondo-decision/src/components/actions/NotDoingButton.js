import React from 'react'

export default ({send}) => {
    return (
        <button className="btn bg-smoke gray opacity-70"
        onClick={() => send('REJECT')}>Not Doing</button>
    )
  }
  