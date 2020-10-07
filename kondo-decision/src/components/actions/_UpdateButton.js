import React from 'react'

export default ({send}) => {
    return (
        <a className="btn bg-blue"
        onClick={() => send('ADD_COMMENT')}>+ Add Comment</a>
    )
  }
  