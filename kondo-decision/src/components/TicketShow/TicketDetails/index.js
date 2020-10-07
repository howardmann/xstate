import React from 'react'
import TicketExpanded from './TicketExpanded'
import TicketPreview from './TicketPreview'
import DownArrow from '../../../images/DownArrow'
import UpArrow from '../../../images/UpArrow'

export default ({issue, current, send}) => {
    return (
        <div onClick={() => send('TOGGLE_DETAILS')}>
            {/* EXPAND/ HIDE CONTROLS */}
            <span style={{position: 'absolute', top: '5px', right: '5px'}}>
                {current.matches('details.preview') && 
                <DownArrow/>
                }
                {current.matches('details.expanded') &&
                <UpArrow/>
                }                
            </span>
            
            {current.matches('details.preview') &&
                <TicketPreview issue={issue}/>
                
            }

            {current.matches('details.expanded') &&
                <TicketExpanded issue={issue}/>
            }
        </div>

    )
}