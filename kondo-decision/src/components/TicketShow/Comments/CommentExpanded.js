import React from 'react'
import FormNew from './FormNew'
import FormPlaceholder from './FormPlaceholder'

export default ({current, send}) => {
    return (
        <div onClick={() => send('TOGGLE_COMMENTS')}>
            <p className="fs-16 bold mt-5 mb-10"><strong>Comments</strong></p>
            {current.matches('comments.expanded.formNew') &&
                <FormNew current={current} send={send}/>
            }
            {current.matches('comments.expanded.formPlaceholder') && 
                <FormPlaceholder current={current} send={send}/>
            }
            
            
            <p>List of comments goes below here</p>
            
        </div>

    )
}