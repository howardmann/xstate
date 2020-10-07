import React from 'react'
import OnHoldButton from '../../../actions/OnHoldButton'
import NotDoingButton from '../../../actions/NotDoingButton'
import MoveToPrevious from '../../../actions/MoveToPrevious'
import MoveToInbox from '../../../actions/MoveToInbox'
import ResolveButton from '../../../actions/ResolveButton'
import EditButton from '../../../actions/EditButton'

export default ({current, send}) => {
    return (
        <div>
            {current.matches('category.previous') &&
                <MoveToInbox send={send}/>
            }
            {current.matches('category.inbox') &&
                <MoveToPrevious send={send}/>
            }

            <NotDoingButton send={send}/>
            <OnHoldButton send={send}/>
            <EditButton send={send}/>
            <ResolveButton send={send}/>
      </div>
    )
}