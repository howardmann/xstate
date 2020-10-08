import React from 'react'
import FormPlaceholder from './FormPlaceholder'
import CommentFirst from './CommentFirst'

export default ({current, send}) => {
    return (
        <div onClick={() => send('TOGGLE_COMMENTS')}>
            {current.matches('comments.preview.formPlaceholder') &&
                <FormPlaceholder current={current} send={send}/>
            }
            {current.matches('comments.preview.comment') && 
                <CommentFirst current={current} send={send}/>
            }            
        </div>

    )
}