import React from 'react';

import TicketDetails from './TicketDetails'
import TicketControls from './TicketControls'
import Comments from '../Comments'
import {findCommentsByIssueId} from '../../data-access/comments-db/index'


const TicketShow = ({issue, current, send}) => {
    const [comments, setComments] = React.useState({})

    const fetchComments = () => {
        return findCommentsByIssueId(issue.id)
            .then(data => {
                setComments(data)
            })
    }

    React.useEffect(() => {
        fetchComments()
    }, [])

    return (
        <div>
            {/* Comments above details if exist */}
            {(comments.length > 0) &&
                <div className="row my-5 border border-silver-hover rounded p-5">
                    <Comments issue={issue} comments={comments} current={current} send={send}/>
                </div>
            }

            {/* Ticket Details */}
            <div className="row cursor border border-silver-hover rounded p-5">
                <TicketDetails issue={issue} current={current} send={send}/>
            </div>            

            {/* Comments below details if exist */}
            {(comments.length === 0) &&
                <div className="row my-5 border border-silver-hover rounded p-5">
                    <Comments issue={issue} comments={comments} current={current} send={send}/>
                </div>
            }

            {/* Ticket Controls */}
            <div className="row my-5 border border-silver-hover rounded p-5">
                <TicketControls current={current} send={send}/>
            </div>              
      </div>

    )
}

export default TicketShow