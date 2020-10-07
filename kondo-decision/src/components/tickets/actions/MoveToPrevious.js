import React from 'react'

export default ({send}) => {
    return (
        <button className="btn bg-lime white opacity-80" onClick={() => send('MARK_READ')}>Previous</button>
    )
}
  