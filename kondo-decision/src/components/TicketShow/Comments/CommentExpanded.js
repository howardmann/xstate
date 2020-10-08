import React from 'react'
import FormNew from './FormNew'
import FormPlaceholder from './FormPlaceholder'

export default ({current, send}) => {
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
            <p>List of comments goes below here</p>
            
        </div>

    )
}