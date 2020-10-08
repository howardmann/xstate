import React from 'react'
import FormNew from '../Form/FormNew'
import FormPlaceholder from '../Form/FormPlaceholder'
import CommentList from '../CommentList'


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
            
            {comments && <CommentList comments={comments} issue={issue}/>}            
        </div>
    )
}