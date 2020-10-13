import React from 'react'
import CommentAvatar from '../CommentAvatar'


const CommentRow = ({comment}) => {
    return (
        <div style={{display: 'flex'}} className="row pl-5 my-10">
            <CommentAvatar url={comment.author_logo}/>
            <div className="row">
                <p className="stone">{comment.author} | {comment.date}</p>
                <p>{comment.comment}</p>
                <hr className="width-100 bg-platinum"/>
            </div>            
            
        </div>
    )
}

export default CommentRow