import React from 'react'
import OnHoldButton from '../../actions/OnHoldButton'
import NotDoingButton from '../../actions/NotDoingButton'

export default ({send}) => {
    return (
        <div>
            <div className="col-6">
                <p className="fs-12 stone small mt-10">MOVE TO</p>              
                <OnHoldButton send={send}/>                        
                <NotDoingButton send={send}/>
            </div>
      </div>
    )
}