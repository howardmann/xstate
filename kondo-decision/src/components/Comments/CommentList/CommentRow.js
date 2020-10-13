import React from 'react'
import CommentAvatar from '../CommentAvatar'
import {formatDistance} from 'date-fns'

const daysAgo = (date) => {
    return formatDistance(date, new Date(), {addSuffix: true})
}

const CommentRow = ({comment}) => {
    return (
        <div style={{display: 'flex'}} className="row pl-5 my-10">
            <CommentAvatar url={comment.author_logo}/>
            <div className="row">
                <p className="stone">{comment.author} . {daysAgo(comment.date)}</p>
                <p>{comment.comment}</p>
                <hr className="width-100 bg-platinum"/>
            </div>            
            
        </div>
    )
}

export default CommentRow