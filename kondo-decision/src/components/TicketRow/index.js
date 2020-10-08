import React from 'react';
import {useMachine} from '@xstate/react'
import actionMachine from '../../stateMachines/actionMachine'

import TicketStatus from './TicketStatus'
import AssignedLogo from './AssignedLogo'
import AssigneeAction from './AssigneeAction'
import TicketShow from '../TicketShow'
import EmailForm from '../EmailForm'
import UpArrow from '../../images/UpArrow'

const TicketRow = ({data, handleStatusChange}) => {  
  const issue = data

  // xState machine with initial context of issue status
  const [current, send] = useMachine(actionMachine.withContext({status: issue.status, category: issue.category, hasComments: false}))

  // Update React State when change to xState context
  React.useEffect(() => {
    handleStatusChange({id: issue.id, status: current.context.status, category: current.context.category})
  }, [current.context.status, current.context.category])


  return (
    <div className={current.matches('issue.active') ? 'modal': null}>
    <div key={issue.id} className="row cursor border-2 border-platinum border-stone-hover rounded bg-white p-5 my-5">
      {/* EXPAND/ HIDE CONTROLS */}
      <span style={{position: 'absolute', top: '5px', right: '5px'}}>
          {current.matches('issue.active') &&
          <span className="fs-12 stone small p-0"><UpArrow/></span> 
          }                
      </span>

      {/* TICKET ROW */}
      <div style={{display: 'flex'}}>
        {/* LHS TICKET_ROW -> ASSIGNED LOGO + TICKET STATUS */}
        <div onClick={() => send('TOGGLE')} style={{width: '88px', flexShrink: 0}}>
          <div className="row">
            <AssignedLogo issue={issue}/>
          </div>
          <div className="row">
            <TicketStatus issue={issue}/>
          </div>          
        </div>
        
        {/* RHS TICKET_ROW -> ISSUE NAME, ASSIGNED, APPROVE BUTTON */}
        <div onClick={() => send('TOGGLE')} className="col-12 ">
          {/* ISSUE NAME */}
          <div className="row">
            <p className="fs-14 gray truncate pr-10">
              {issue.name}
            </p>            
          </div>
        
          {/* ASSIGNEE NAME & APPROVE ACTION for New, OnHold & NotDoing */}
          <div className="row">
            <AssigneeAction issue={issue} current={current} send={send}/>
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
    </div>
  )
}

export default TicketRow