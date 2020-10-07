import React from 'react'
import OnHoldButton from '../../../actions/OnHoldButton'
import NotDoingButton from '../../../actions/NotDoingButton'
import EditButton from '../../../actions/EditButton'
import MailToButton from '../../../actions/MailToButton'

export default ({send}) => {
    return (
        <div>
            <OnHoldButton send={send}/>                        
            <NotDoingButton send={send}/>
            <EditButton/>
            <MailToButton send={send}/>
        </div>
    )
}