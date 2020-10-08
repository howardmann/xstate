import React from 'react'
import FormNew from './FormNew'
import FormPlaceholder from './FormPlaceholder'
import CommentList from './CommentList'


export default ({current, send, issue, comments}) => {
    return (
        <div>
            {current.matches('comments.expanded.formNew') &&
                <FormNew current={current} send={send}/>
            }
            {current.matches('comments.expanded.formPlaceholder') && 
                <div onClick={() => send('FOCUS')}> 
                    <FormPlaceholder current={current} send={send}/>
                </div>
            }                        
            
            <CommentList comments={comments} issue={issue}/>
            
        </div>

    )
}