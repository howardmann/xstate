import React from 'react'

export default ({send}) => {
    return (
      <a onClick={() => send('APPROVE')}>📧 Email Me Issue</a>
    )
  }
  