import React from 'react'

export default ({send}) => {
    return (
        <button className="btn bg-teal white opacity-80" onClick={() => send('MARK_UNREAD')}>Inbox</button>
    )
}
