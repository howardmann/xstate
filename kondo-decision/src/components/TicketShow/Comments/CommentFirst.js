import React from 'react'
import CommentAvatar from './CommentAvatar'

export default ({current, send}) => {
    return (
        <div>
            <div style={{display: 'flex'}} className="row pl-5">
                <CommentAvatar/>
                <p>Placeholder of first comment ok</p>
        </div>

        </div>
    )
}