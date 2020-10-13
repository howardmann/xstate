import React from 'react'
import UpArrow from '../../images/UpArrow'
import DownArrow from '../../images/DownArrow'
import CommentPreview from './CommentPreview'
import CommentExpanded from './CommentExpanded'

export default ({current, send, issue, comments, handleSubmitComment}) => {
    const commentCount = comments && (comments.length > 0) ? comments.length : '';

    return (
        <div className="pb-10">
            {/* COMMENTS NAME AND CONTROLS */}
            <div className="row">
                <p className="fs-14 bold mt-5 mb-10"><strong>Comments <span className="stone"> {commentCount}</span></strong></p>

                {/* EXPAND/ HIDE CONTROLS */}
                {comments.length > 1 &&
                    <span onClick={()=> send('TOGGLE_COMMENTS')} style={{position: 'absolute', top: '5px', right: '5px'}}>
                        {current.matches('comments.preview') && 
                        <>
                            <span className="fs-12 stone small p-0">SHOW <DownArrow/></span> 
                        </>
                        }
                        {current.matches('comments.expanded') &&
                            <span className="fs-12 stone small p-0">HIDE <UpArrow/></span> 
                        }                
                    </span>
                }
            </div>


            {current.matches('comments.preview') &&
                <CommentPreview comments={comments} issue={issue} current={current} send={send}/>
            }

            {current.matches('comments.expanded') &&
                <CommentExpanded handleSubmitComment={handleSubmitComment} comments={comments} issue={issue} current={current} send={send}/>
            }
        </div>
    )
}