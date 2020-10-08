import React from 'react'
import FormPlaceholder from '../Form/FormPlaceholder'
import CommentFirst from './CommentFirst'

export default ({current, send, comments}) => {
    return (
        <div>
            {(comments.length > 1) ?
                    <CommentFirst comments={comments} current={current} send={send}/>
                :
                    <FormPlaceholder current={current} send={send}/>
            }            
        </div>

    )
}