import React from 'react'
import UpdateButton from '../../actions/UpdateButton'

export default ({current, send}) => {
    return (
        <div className="col-12 right-align">
            <UpdateButton send={send}/>
        </div>
    )
}