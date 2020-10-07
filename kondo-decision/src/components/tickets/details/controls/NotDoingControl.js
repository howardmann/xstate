import React from 'react'
import MoveToInbox from '../../actions/MoveToInbox'
import MoveToPrevious from '../../actions/MoveToPrevious'
import OnHoldButton from '../../actions/OnHoldButton'
import UpdateButton from '../../actions/UpdateButton'

export default ({current, send}) => {
    return (
        <div>
            <div className="col-6">
            <p className="fs-12 stone small mt-10">MOVE TO</p>              
            {current.matches('category.previous') &&
                <MoveToInbox send={send}/>
            }
            {current.matches('category.inbox') &&
                <MoveToPrevious send={send}/>
            }

            <OnHoldButton send={send}/>
            </div>
            <div className="col-6 right-align">
            <p className="fs-12 stone small mt-10">ACTION</p>
            <UpdateButton send={send}/>
            </div>
      </div>

    )
}