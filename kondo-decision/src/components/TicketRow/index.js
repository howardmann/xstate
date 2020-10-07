import React from 'react';
import {useMachine} from '@xstate/react'
import actionMachine from '../../stateMachines/actionMachine'
import useOnClickOutside from 'use-onclickoutside'

import TicketStatus from './TicketStatus'
import AssignedLogo from './AssignedLogo'
import TicketShow from '../TicketShow'
import EmailForm from '../EmailForm'
import ApproveButton from '../actions/ApproveButton'

const TicketRow = ({data, handleStatusChange}) => {  
  const issue = data
  // xState machine with initial context of issue status
  const [current, send] = useMachine(actionMachine.withContext({status: issue.status, category: issue.category, comment: ''}))

  // Update React State when change to xState context
  React.useEffect(() => {
    handleStatusChange({id: issue.id, status: current.context.status, category: current.context.category})
  }, [current.context.status, current.context.category])


  const handleClose = () => {
    send('HIDE_ISSUE')
  }
  // detect onclickoutside library
  const onClickOutsideRef = React.useRef(null)
  useOnClickOutside(onClickOutsideRef, handleClose)

  return (
    <div ref={onClickOutsideRef} className="row cursor border-2 border-platinum rounded bg-white p-5 my-5">
        {/* LHS TICKET_ROW -> ASSIGNED LOGO + TICKET STATUS */}
        <div onClick={() => send('TOGGLE')} className="col-2 phone-col-3">
          <div className="row">
            <AssignedLogo issue={issue}/>
          </div>
          <div className="row">
            <TicketStatus issue={issue}/>
          </div>          
        </div>
        
        {/* RHS TICKET_ROW -> ISSUE NAME, ASSIGNED, APPROVE BUTTON */}
        <div onClick={() => send('TOGGLE')} className="col-10 phone-col-9 ">
          {/* ISSUE NAME */}
          <div className="row">
            <p className="fs-14 gray truncate">
              {issue.name}
            </p>            
          </div>

          <div className="row">
            {/* ASSIGNED */}
            <div className="col-8 phone-col-4 truncate">
              <p className="fs-10 mt-5 stone small">ASSIGNED</p>
              <p className="truncate fs-14">{issue.assigned}</p>
            </div>
            
            {/* APPROVE BUTTON */}
            <div style={{'zIndex': 200}} className="col-4 phone-col-8 right-align mt-5">
                {(current.matches('actions.status.new') || current.matches('actions.status.onHold') || current.matches('actions.status.notDoing')) &&
                  <ApproveButton issue={issue}/>
                }
            </div>
          </div>            
        </div>

        {/* XSTATE DEBUGGING */}
        {/* <small>
          <p>current.value: {JSON.stringify(current.value)}</p>
          <p>current.context: {JSON.stringify(current.context)}</p>
        </small>               */}



        {/* TICKET SHOW */}
        <div className="row">
          {/* TicketShow */}
          {current.matches('issue.active') &&
            <div className="pt-5">
              <TicketShow issue={issue} current={current} send={send}/>
            </div>
          }

          {/* EmailForm */}
          {current.matches('actions.email') && 
            <div className="pt-5">
              <EmailForm issue={issue} send={send}/>
            </div>
          }
        </div>

    </div>
  )
}

export default TicketRow