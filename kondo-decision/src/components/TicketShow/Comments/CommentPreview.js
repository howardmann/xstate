import React from 'react'
import FormPlaceholder from './FormPlaceholder'
import CommentFirst from './CommentFirst'

export default ({current, send}) => {
    return (
        <div>
            <p className="fs-16 bold mt-5 mb-10"><strong>Comments</strong></p>
            {current.matches('comments.preview.formPlaceholder') &&
                <FormPlaceholder current={current} send={send}/>
            }
            {current.matches('comments.preview.comment') && 
                <CommentFirst current={current} send={send}/>
            }            
        </div>

    )
}