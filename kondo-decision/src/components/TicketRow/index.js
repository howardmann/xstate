import React from 'react';
import {useMachine} from '@xstate/react'
import actionMachine from '../../stateMachines/actionMachine'

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

  return (
    <div className="row border-2 border-platinum rounded bg-white p-5 my-5">
        {/* LHS TICKET_ROW -> ASSIGNED LOGO + TICKET STATUS */}
        <div onClick={() => send('TOGGLE')} className="col-2 phone-col-3 cursor">
          <div className="row">
            <AssignedLogo issue={issue}/>
          </div>
          <div className="row">
            <TicketStatus issue={issue}/>
          </div>          
        </div>
        
        {/* RHS TICKET_ROW -> ISSUE NAME, ASSIGNED, APPROVE BUTTON */}
        <div className="col-10 phone-col-9 ">
          {/* ISSUE NAME */}
          <div onClick={() => send('TOGGLE')} className="row cursor">
            <p className="fs-14 gray truncate">
              {issue.name}
            </p>            
          </div>

          <div className="row">
            {/* ASSIGNED */}
            <div onClick={() => send('TOGGLE')} className="col-8 phone-col-4 truncate cursor">
              <p className="fs-10 mt-5 stone small">ASSIGNED</p>
              <p className="truncate fs-14">{issue.assigned}</p>
            </div>
            
            {/* APPROVE BUTTON */}
            <div className="col-4 phone-col-8 right-align mt-5">
                {(current.matches('actions.status.new') || current.matches('actions.status.onHold') || current.matches('actions.status.notDoing')) &&
                  <ApproveButton issue={issue}/>
                }
            </div>
          </div>            
        </div>

        {/* TICKET SHOW */}
        <div className="row">
          {/* TicketShow */}
          {current.matches('issue.active') &&
            <TicketShow issue={issue} current={current} send={send}/>
          }

          {/* EmailForm */}
          {current.matches('actions.email') && 
            <EmailForm issue={issue} send={send}/>
          }

        </div>

        {/* <p>Status: {issue.actions.status}</p> */}

        {/* <small>
          <p>current.value: {JSON.stringify(current.value)}</p>
          <p>current.context: {JSON.stringify(current.context)}</p>
        </small>               */}
    </div>
  )
}

export default TicketRow