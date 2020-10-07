import React from 'react';

import TicketDetails from './TicketDetails'
import TicketControls from './TicketControls'


const TicketShow = ({issue, current, send}) => {
    return (
        <div>
            {/* Comments placeholder */}
            <div className="row my-5 border rounded p-5">
                <p>Comments placeholder</p>
            </div>
            {/* Ticket Details */}
            <div className="row cursor border rounded p-5" onClick={() => send('TOGGLE')}>
                <TicketDetails issue={issue} current={current} send={send}/>
            </div>
            

            {/* Ticket Controls */}
            <div className="row my-5 border rounded p-5">
                <TicketControls current={current} send={send}/>
            </div>              
      </div>

    )
}

export default TicketShow