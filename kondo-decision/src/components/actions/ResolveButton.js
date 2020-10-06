import React from 'react'

export default ({send}) => {
    return (
        <button className="btn btn-primary"
        onClick={() => send('RESOLVED')}>Resolved</button>
    )
}
  