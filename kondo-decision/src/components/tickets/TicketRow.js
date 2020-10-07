import React from 'react';
import {useMachine} from '@xstate/react'
import actionMachine from '../../stateMachines/actionMachine'

import NewControl from './details/controls/NewControl'
import InProgressControl from './details/controls/InProgressControl'
import OnHoldControl from './details/controls/OnHoldControl'
import NotDoingControl from './details/controls/NotDoingControl'
import ResolvedControl from './details/controls/ResolvedControl'

import ApproveButton from './actions/ApproveButton'
import MailToButton from './actions/MailToButton'
import EditButton from './actions/EditButton'
import UpdateButton from './actions/UpdateButton'

// const initialData = {
//   name: 'Excessive operation',
//   status: 'In Progress',
//   assignee: 'bill'
// }

const getColor = (status) => {
  const colorIndex = {
    "New": 'teal',
    "In Progress": 'lime',
    "On Hold": 'orange',
    "Resolved": 'green',
    "Not Doing": 'gray',
    "Urgent": 'red',
    "Maintenance": 'stone',
    "Monitor": 'blue' 
  }
  return colorIndex[status]
}

const CommentInput = ({send, current}) => {  
  return (
    <div className="border p-5">
      <h3 className="center">Add Comment</h3>
      <textarea className="width-100" id="" cols="30" rows="4" placeholder="Enter comment"></textarea>

      <div className="row">
        <div className="col-2 left-align">
          <button className="btn btn-outline" onClick={() => send('CLOSE')}>🔙</button>        
        </div>
        <div className="col-10 right-align">
          { current.matches('actions.comment.general') &&
            <button className="btn btn-primary" onClick={() => {
              send('SUBMIT')
            }}>ADD COMMENT</button>
          }
          { current.matches('actions.comment.resolved') &&
            <button className="btn btn-primary" onClick={() => send('SUBMIT')}>✔️ RESOLVE</button>
          }
        </div>
      </div>        
    </div>
  )
}

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
        {/* LHS ROW -> LOGO ASSIGNEE & PRIORITY */}
        <div 
          onClick={() => send('TOGGLE')}
          className="col-2 phone-col-3 cursor"
        >
          <div className="row">
              <img height="40" src={issue.companyLogo} alt=""/>
          </div>
          <div className="row">
            <span
              className={`bg-${getColor(issue.status)} fs-12 white px-5 rounded truncate`}
            >
              {(issue.priority === 'Urgent') && 
                <span> ⚠️ </span>
              }
              {issue.status}
            </span>
          </div>          
        </div>
        
        {/* RHS ROW */}
        <div className="col-10 phone-col-9 ">
          {/* ISSUE NAME */}
          <div 
            onClick={() => send('TOGGLE')} 
            className="row cursor"
          >
            <p className="fs-14 gray truncate">
              {issue.name}
            </p>            
          </div>
          {/* ASSIGNED */}
          <div className="row">
            <div 
              onClick={() => send('TOGGLE')} 
              className="col-8 phone-col-4 truncate cursor">
              <p className="fs-10 mt-5 stone small">ASSIGNED</p>
              <p className="truncate fs-14">{issue.assigned}</p>
            </div>
            
            {/* TICKET ROW ACTION BUTTONS */}
            <div className="col-4 phone-col-8">
              <div className="right-align mt-5">
                {current.matches('actions.status.new') &&
                  <div>
                    <ApproveButton issue={issue}/>
                  </div>
                }

                {current.matches('actions.status.inProgress') &&
                  <div>
                    <UpdateButton send={send}/>
                  </div>
                }

                {current.matches('actions.status.onHold') &&
                  <div>
                    <ApproveButton issue={issue}/>
                  </div>
                }

                {current.matches('actions.status.notDoing') &&
                  <div>
                    <ApproveButton issue={issue}/>
                  </div>
                }      
              </div>
            </div>
          </div>
          
          {/* NOTE: REPLACE WITH COMMENTS */}
          <div className="row">
            {/* Comment Input Box */}
            {current.matches('actions.comment') &&
              <div className="right-align">
                <CommentInput send={send} current={current}/>
              </div>
            }

            {/* Email Input Box */}
            {current.matches('actions.email') && 
              <div className="left-align p-5 border">
                <h3 className="center">Send Email</h3>
                <p>To:</p>
                <p><input className="width-100" type="email" value={issue.email}/></p>
                <p>Cc:</p>
                <p><input className="width-100" type="email" value="engineering@cim.io"/></p>
                <p>Subject:</p>
                <p><input className="width-100" type="text" value={issue.name}/></p>
                <p>Body:</p>
                <textarea className="width-100" cols="30" rows="5" placeholder="Prefill issue details with CTA link"></textarea>
                <div className="row">                                  
                  <div className="col-2">
                    <button className="btn btn-outline" onClick={() => send('CLOSE')}>🔙</button>            
                  </div>
                  <div className="col-10 right-align">
                    <button className="btn btn-primary right-align" onClick={() => {
                      send('SUBMIT')
                      alert('📧 Email Sent')
                    }}>📧 SUBMIT</button>
                  </div>                      
                </div>                  
              </div>
            }
          </div>
          
          {/* TicketShow */}
          {current.matches('issue.active') &&
            <div>
              {/* Issue Details */}
              <div
                 className="row cursor"
                onClick={() => send('TOGGLE')}            
              >
                <p className="fs-12 stone small mt-10">⚠️ DESCRIPTION</p>
                <p className="fs-14">{issue.description}</p>
                <p className="fs-12 stone small mt-10">✅ SOLUTION</p>
                <p className="fs-14">{issue.solution}</p>
                <p className="fs-12 stone small mt-10">IMPROVE</p>
                <p className="fs-14">{issue.benefit}</p>            
                <p className="fs-12 stone small mt-10">EQUIPMENT</p>
                <p className="fs-14">{issue.equipment}</p>            
                {issue.tenants.length > 0 &&
                  <>
                    <p className="fs-12 stone small mt-10">TENANTS AFFECTED</p>              
                    <p className="fs-14">{issue.tenants}</p>
                  </>
                }

                <p className="fs-12 stone small mt-10">ISSUE RAISED</p>
                <p className="fs-14">{issue.raised}</p>            

                {/* Issue Comments */}
                {issue.comments && 
                  <>
                    <p className="fs-12 stone small mt-10">COMMENTS</p>
                    <p className="fs-14">{issue.comments}</p>            
                  </>                
                }

              </div>              
              
              {/* Attachments */}
              <div className="row">
                {issue.attachments && <p className="fs-12 stone small mt-10">ATTACHMENTS</p>}
                {(issue.attachments) &&

                  issue.attachments.map(el => {
                    return <a href={el} target="_blank">
                      <img height="80" src={el}/>
                    </a>
                  })
                }
              </div>
              
              {/* Edit & Email button */}
              <div className="row mt-20">
                  <div className="col-6">
                    <EditButton/>
                  </div>
                  <div className="col-6 right-align my-5">
                    {current.matches('actions.status.new') && 
                      <MailToButton send={send}/>
                    }
                    
                  </div>
                
              </div>
              
              {/* Status Controls */}
              <div className="row mt-20">
                  {current.matches('actions.status.new') &&
                    <NewControl send={send}/> 
                  }

                  {current.matches('actions.status.inProgress') &&
                    <InProgressControl current={current} send={send}/>
                  }

                  {current.matches('actions.status.onHold') &&
                    <OnHoldControl current={current} send={send}/>
                  }

                  {current.matches('actions.status.notDoing') &&
                    <NotDoingControl current={current} send={send}/>
                  }

                  {current.matches('actions.status.resolved') &&
                    <ResolvedControl current={current} send={send}/>
                  }
              </div>              
            </div>
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