import React from 'react';

// Controls
import NewControl from './controls/NewControl'
import InProgressControl from './controls/InProgressControl'
import OnHoldControl from './controls/OnHoldControl'
import NotDoingControl from './controls/NotDoingControl'
import ResolvedControl from './controls/ResolvedControl'

const TicketControls = ({current, send}) => {
    return (
        <>
            {current.matches('status.new') &&
            <NewControl send={send}/> 
            }

            {current.matches('status.inProgress') &&
            <InProgressControl current={current} send={send}/>
            }

            {current.matches('status.onHold') &&
            <OnHoldControl current={current} send={send}/>
            }

            {current.matches('status.notDoing') &&
            <NotDoingControl current={current} send={send}/>
            }

            {current.matches('status.resolved') &&
            <ResolvedControl current={current} send={send}/>
            }
        </>
    )
}

export default TicketControls