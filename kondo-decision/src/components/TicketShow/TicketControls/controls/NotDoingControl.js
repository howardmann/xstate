import React from 'react'
import MoveToInbox from '../../../actions/MoveToInbox'
import MoveToPrevious from '../../../actions/MoveToPrevious'
import OnHoldButton from '../../../actions/OnHoldButton'
import EditButton from '../../../actions/EditButton'
import MailToButton from '../../../actions/MailToButton'

export default ({current, send}) => {
    return (
        <div>
            {current.matches('category.previous') &&
                <MoveToInbox send={send}/>
            }
            {current.matches('category.inbox') &&
                <MoveToPrevious send={send}/>
            }
            <OnHoldButton send={send}/>
            <EditButton send={send}/>
            <MailToButton send={send}/>                        
      </div>

    )
}