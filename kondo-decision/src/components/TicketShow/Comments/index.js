import React from 'react'
import FormPlaceholder from './FormPlaceholder'
import UpArrow from '../../../images/UpArrow'
import DownArrow from '../../../images/DownArrow'

export default ({current, send}) => {
    return (
        <div onClick={() => send('TOGGLE_COMMENTS')} className="pb-10">
            {/* EXPAND/ HIDE CONTROLS */}
            <span style={{position: 'absolute', top: '5px', right: '5px'}}>
                {current.matches('comments.preview') && 
                <DownArrow/>
                }
                {current.matches('comments.expanded') &&
                <UpArrow/>
                }                
            </span>


            <p className="fs-16 bold mt-5 mb-10"><strong>Comments</strong></p>
            {current.matches('comments.preview.formPlaceholder') &&
                <div onClick={() => send('FOCUS')}>
                    <FormPlaceholder current={current} send={send}/>
                </div>                 
            }
        </div>
    )
}