import React from 'react'
import CommentRow from './CommentRow'

const CommentList = ({comments}) => {
    return (
        <>
        {(comments.length > 0) && comments.map(comment => <CommentRow key={comment.id} comment={comment}/>)}
        </>
    )    
}

export default CommentList