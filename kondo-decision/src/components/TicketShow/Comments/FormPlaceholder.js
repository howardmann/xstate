import React from 'react'
import CommentAvatar from './CommentAvatar.js'

export default ({current, send}) => {
    return (
        <div style={{display: 'flex'}} className="row pl-5">
            <CommentAvatar/>

            <textarea placeholder="Add a comment..." style={{display: "flex", flexGrow: 1, alignItems: 'center', padding: '6px', resize: 'auto'}} width="100" className="border cursor">                
            </textarea>
        </div>
    )
}