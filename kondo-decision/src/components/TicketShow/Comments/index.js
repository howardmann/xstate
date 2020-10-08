import React from 'react'
import UpArrow from '../../../images/UpArrow'
import DownArrow from '../../../images/DownArrow'
import CommentPreview from './CommentPreview'
import CommentExpanded from './CommentExpanded'
import {findCommentsByIssueId} from '../../../data-access/comments-db/index'


export default ({current, send, issue}) => {
    const [comments, setComments] = React.useState({})
    
    const fetchComments = () => {
        return findCommentsByIssueId(issue.id)
            .then(data => {
                setComments(data)
            })
    }
    
    React.useEffect(()=> {
        fetchComments()
    }, [])

    const commentCount = (comments.length > 0) ? comments.length : '';

    return (
        <div className="pb-10">
            {/* COMMENTS NAME AND CONTROLS */}
            <div onClick={() => send('TOGGLE_COMMENTS')} className="row">
                <p className="fs-14 bold mt-5 mb-10"><strong>Comments <span className="stone"> {commentCount}</span></strong></p>

                {/* EXPAND/ HIDE CONTROLS */}
                <span style={{position: 'absolute', top: '5px', right: '5px'}}>
                    {current.matches('comments.preview') && 
                    <>
                        <span className="fs-12 stone small p-0">SHOW <DownArrow/></span> 
                    </>
                    }
                    {current.matches('comments.expanded') &&
                        <span className="fs-12 stone small p-0">HIDE <UpArrow/></span> 
                    }                
                </span>
            </div>


            {current.matches('comments.preview') &&
                <CommentPreview issue={issue} current={current} send={send}/>
            }

            {current.matches('comments.expanded') &&
                <CommentExpanded comments={comments} issue={issue} current={current} send={send}/>
            }
        </div>
    )
}