import React from 'react'
import CommentAvatar from '../CommentAvatar/index.js'
import {fetchCurrentUser} from '../../../data-access/users-db/index'

export default ({issue, current, send, handleSubmitComment}) => {    

    const submitComment = () => {
        if (!current.context.comment || current.context.comment.length < 1) {return}
        return fetchCurrentUser()
            .then(user => {
                let issue_id = issue.id
                let author = user.name
                let author_logo = user.avatarURL
                // xstate context
                let comment = current.context.comment
                return handleSubmitComment({comment,issue_id, author, author_logo})
            })
            .then(()=>
                send('SUBMIT_COMMENT')
            )
    }
    
    return (
        <>
        <div style={{display: 'flex'}} className="row pl-5">
            <CommentAvatar/>
            <textarea onChange={evt => send('UPDATE_COMMENT', {comment: evt.target.value})} required autoFocus placeholder="Add a comment..." style={{display: "flex", flexGrow: 1, alignItems: 'center', padding: '6px', resize: 'auto'}} width="100" className="border cursor"/>                            
        </div>

        {/* FORM ACTIONS */}
        <div className="row right-align">
            <a onClick={() => send('CANCEL')} className="btn btn-outline mr-10">CANCEL</a>
            <a onClick={() => submitComment()} className="btn">COMMENT</a>
        </div>
        </>
    )
}