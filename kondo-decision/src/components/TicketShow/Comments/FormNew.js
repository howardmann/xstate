import React from 'react'
import CommentAvatar from './CommentAvatar.js'

export default ({current, send}) => {
    return (
        <>
        <div style={{display: 'flex'}} className="row pl-5">
            <CommentAvatar/>

            <textarea autoFocus placeholder="Add a comment..." style={{display: "flex", flexGrow: 1, alignItems: 'center', padding: '6px', resize: 'auto'}} width="100" className="border cursor">                
            </textarea>            
        </div>

        {/* FORM ACTIONS */}
        <div className="row right-align">
            <a onClick={() => send('CANCEL')} className="btn btn-outline">CANCEL</a>
            <a onClick={() => send('SUBMIT_COMMENT')} className="btn">COMMENT</a>
        </div>
        </>
    )
}