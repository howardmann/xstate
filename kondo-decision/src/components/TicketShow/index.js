import React from 'react';

import TicketDetails from './TicketDetails'
import TicketControls from './TicketControls'
import Comments from '../Comments'
import findCommentsByIssueId from '../../data-access/comments-db/findCommentsByIssueId'
import postComment from '../../data-access/comments-db/postComment'
// import {findCommentsByIssueId, postComment} from '../../data-access/comments-db/index'


const TicketShow = ({issue, current, send}) => {
    const [comments, setComments] = React.useState({})

    const fetchComments = () => {
        return findCommentsByIssueId(issue.id)
            .then(data => {
                setComments(data)
            })
    }

    // comment update
    const handleSubmitComment = ({issue_id, author, author_logo, comment}) => {
        return postComment({issue_id, author, author_logo, comment})
            .then(() => fetchComments())
    }

    React.useEffect(() => {
        fetchComments()
    }, [])

    return (
        <div>
            {/* Comments above details if exist */}
            {(comments.length > 0) &&
                <div className="row my-5 border border-silver-hover rounded px-10">
                    <Comments handleSubmitComment={handleSubmitComment} issue={issue} comments={comments} current={current} send={send}/>
                </div>
            }

            {/* Ticket Details */}
            <div className="row cursor border border-silver-hover rounded px-10">
                <TicketDetails issue={issue} current={current} send={send}/>
            </div>            

            {/* Comments below details if exist */}
            {(comments.length === 0) &&
                <div className="row my-5 border border-silver-hover rounded px-10">
                    <Comments handleSubmitComment={handleSubmitComment} issue={issue} comments={comments} current={current} send={send}/>
                </div>
            }

            {/* Ticket Controls */}
            <div className="row my-5 border border-silver-hover rounded px-10">
                <TicketControls current={current} send={send}/>
            </div>              
      </div>

    )
}

export default TicketShow