import React from 'react'
import OnHoldButton from '../actions/OnHoldButton'
import NotDoingButton from '../actions/NotDoingButton'
import UpdateButton from '../actions/UpdateButton'

export default ({send}) => {
    return (
        <div>
            <div className="col-6">
                <p className="fs-12 stone small mt-10">MOVE TO</p>              
                <OnHoldButton send={send}/>                        
                <NotDoingButton send={send}/>
            </div>
            <div className="col-6 right-align">
                <p className="fs-12 stone small mt-10">ACTION</p>
                <UpdateButton send={send}/>
            </div>
      </div>
    )
}