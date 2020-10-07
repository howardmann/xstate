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
            {current.matches('actions.status.new') &&
            <NewControl send={send}/> 
            }

            {current.matches('actions.status.inProgress') &&
            <InProgressControl current={current} send={send}/>
            }

            {current.matches('actions.status.onHold') &&
            <OnHoldControl current={current} send={send}/>
            }

            {current.matches('actions.status.notDoing') &&
            <NotDoingControl current={current} send={send}/>
            }

            {current.matches('actions.status.resolved') &&
            <ResolvedControl current={current} send={send}/>
            }
        </>
    )
}

export default TicketControls