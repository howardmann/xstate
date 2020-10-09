import React from 'react'
import TicketExpanded from './TicketExpanded'
import TicketPreview from './TicketPreview'
import DownArrow from '../../../images/DownArrow'
import UpArrow from '../../../images/UpArrow'

export default ({issue, current, send}) => {
    return (
        <div className='pb-5'>
            {/* EXPAND/ HIDE CONTROLS */}
            <span onClick={() => send('TOGGLE_DETAILS')} style={{position: 'absolute', top: '5px', right: '5px'}}>
                {current.matches('details.preview') && 
                <span className="fs-12 stone small p-0"> <DownArrow/></span> 
                }
                {current.matches('details.expanded') &&
                <span className="fs-12 stone small p-0">HIDE <UpArrow/></span> 
                }                
            </span>
            
            {current.matches('details.preview') &&
                <TicketPreview issue={issue} send={send}/>                
            }

            {current.matches('details.expanded') &&
                <TicketExpanded issue={issue}/>
            }
        </div>

    )
}