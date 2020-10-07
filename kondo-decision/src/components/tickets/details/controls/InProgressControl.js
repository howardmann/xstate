import React from 'react'
import OnHoldButton from '../../actions/OnHoldButton'
import NotDoingButton from '../../actions/NotDoingButton'
import MoveToPrevious from '../../actions/MoveToPrevious'
import MoveToInbox from '../../actions/MoveToInbox'
import ResolveButton from '../../actions/ResolveButton'

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

                <NotDoingButton send={send}/>
                <OnHoldButton send={send}/>
                </div>
                <div className="col-6 right-align">
                <p className="fs-12 stone small mt-10">ACTION</p>
                <ResolveButton send={send}/>
            </div>
      </div>
    )
}