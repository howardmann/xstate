import React from 'react'
import ApproveButton from '../actions/ApproveButton'

const AssigneeAction = ({issue, current, send}) => {
    return (
        <div>
            {(current.matches('actions.status.new') || current.matches('actions.status.onHold') || current.matches('actions.status.notDoing'))
                ?
                    <>
                        <div className="col-8 phone-col-4 truncate">
                            <p className="fs-10 mt-5 stone small">ASSIGNED</p>
                            <p className="truncate fs-14">{issue.assigned}</p>
                        </div>
                        <div style={{'zIndex': 200}} className="col-4 phone-col-8 right-align mt-5">                
                            <ApproveButton issue={issue}/>
                        </div>
                    </>
                :
                    <div className="col-12">
                        <p className="fs-10 mt-5 stone small">ASSIGNED</p>
                        <p className="truncate fs-14">{issue.assigned}</p>
                    </div>
            }
        </div>
    )
}

export default AssigneeAction