import React from 'react'
import MoveToInbox from '../../../actions/MoveToInbox'
import MoveToPrevious from '../../../actions/MoveToPrevious'
import NotDoingButton from '../../../actions/NotDoingButton'
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
            <NotDoingButton send={send}/>
            <EditButton send={send}/>
            <MailToButton send={send}/>            
      </div>
    )
}