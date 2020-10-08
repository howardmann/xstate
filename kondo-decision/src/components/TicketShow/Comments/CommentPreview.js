import React from 'react'
import FormPlaceholder from './FormPlaceholder'
import CommentFirst from './CommentFirst'

export default ({current, send, comments}) => {
    return (
        <div onClick={() => send('TOGGLE_COMMENTS')}>
            {(comments.length > 1) ?
                    <CommentFirst comments={comments} current={current} send={send}/>
                :
                    <FormPlaceholder current={current} send={send}/>
            }            
        </div>

    )
}