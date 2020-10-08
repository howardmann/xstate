import React from 'react'
import CommentAvatar from './CommentAvatar'
import truncateWords from '../../../util/truncateWords'

export default ({current, send, comments}) => {
    // Todo retrieve latest comment
    let comment = comments[0]

    return (
        <div style={{display: 'flex'}} className="row pl-5 ">
            <CommentAvatar url={comment.author_logo}/>
            <div className="row">
                <p className="stone">{comment.author}</p>
                <p>{truncateWords(comment.comment,20)}</p>
            </div>            
            
        </div>
    )
}
