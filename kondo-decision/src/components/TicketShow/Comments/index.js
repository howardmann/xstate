import React from 'react'
import UpArrow from '../../../images/UpArrow'
import DownArrow from '../../../images/DownArrow'
import CommentPreview from './CommentPreview'
import CommentExpanded from './CommentExpanded'


export default ({current, send}) => {
    return (
        <div className="pb-10">
            {/* EXPAND/ HIDE CONTROLS */}
            <span onClick={()=> send('TOGGLE_COMMENTS')} style={{position: 'absolute', top: '5px', right: '5px'}}>
                {current.matches('comments.preview') && 
                <DownArrow/>
                }
                {current.matches('comments.expanded') &&
                <UpArrow/>
                }                
            </span>

            {current.matches('comments.preview') &&
                <CommentPreview current={current} send={send}/>
            }

            {current.matches('comments.expanded') &&
                <CommentExpanded current={current} send={send}/>
            }
        </div>
    )
}