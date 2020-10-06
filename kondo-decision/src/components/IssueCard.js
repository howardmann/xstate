import React from 'react';
import {useMachine} from '@xstate/react'
import actionMachine from '../stateMachines/actionMachine'


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

const MailToButton = ({send}) => {
  return (
    <a onClick={() => send('APPROVE')}>📧 Email Me Issue</a>
  )
}

const EditButton = () => {
  return (
    <a onClick={() => alert('Open Edit Issue Form')}  className="btn bg-haze gray"> Edit Issue</a>
  )
}
const ApproveButton = ({issue}) => {
  return (
    <a href={issue.mailto} className="btn btn-primary" target="_blank">✨ Approve ✨</a>    
  )
}

const MoveToInbox = ({send}) => {
  return (
    <button className="btn bg-teal white opacity-80" onClick={() => send('MARK_UNREAD')}>Inbox</button>
  )
}

const MoveToPrevious = ({send}) => {
  return (
    <button className="btn bg-lime white opacity-80" onClick={() => send('MARK_READ')}>Previous</button>
  )
}


const ResolveButton = ({send}) => {
  return (
      <button className="btn btn-primary"
      onClick={() => send('RESOLVED')}>Resolved</button>
  )
}

const OnHoldButton = ({send}) => {
  return (
      <button className="btn bg-yellow gray opacity-70"
      onClick={() => send('HOLD')}>On Hold</button>
  )
}

const NotDoingButton = ({send}) => {
  return (
      <button className="btn bg-smoke gray opacity-70"
      onClick={() => send('REJECT')}>Not Doing</button>
  )
}


const UpdateButton = ({send}) => {
  return (
      <a className="btn bg-blue"
      onClick={() => send('ADD_COMMENT')}>+ Add Comment</a>
  )
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

const IssueCard = ({data, handleStatusChange}) => {  
  const issue = data
  // xState machine with initial context of issue status
  const [current, send] = useMachine(actionMachine.withContext({status: issue.status, category: issue.category, comment: ''}))

  // Update React State when change to xState context
  React.useEffect(() => {
    handleStatusChange({id: issue.id, status: current.context.status, category: current.context.category})
  }, [current.context.status, current.context.category])

  return (
    <div className="row border-2 border-platinum rounded bg-white p-5 my-5">
        <div 
          onClick={() => send('TOGGLE')}
          className="col-2 phone-col-3 cursor">
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
          {/* <p className={`fs-12 truncate ${getColor(issue.priority)}`}>
            {issue.priority}
          </p>
          */}
        </div>
        <div className="col-10 phone-col-9 ">
          <div 
            onClick={() => send('TOGGLE')} 
            className="row cursor"
          >
            <p className="fs-14 gray truncate">
              {issue.name}
            </p>            
          </div>
          <div className="row">
            <div 
              onClick={() => send('TOGGLE')} 
              className="col-8 phone-col-4 truncate cursor">
              <p className="fs-10 mt-5 stone small">ASSIGNED</p>
              <p className="truncate fs-14">{issue.assigned}</p>

            </div>
            <div className="col-4 phone-col-8">
              {/* ACTION BUTTONS */}
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

          <div className="row">
            {current.matches('actions.comment') &&
              <div className="right-align">
                <CommentInput send={send} current={current}/>
              </div>
            }

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

          {current.matches('issue.active') &&
            <div>
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

                {issue.comments && 
                <>
                  <p className="fs-12 stone small mt-10">COMMENTS</p>
                  <p className="fs-14">{issue.comments}</p>            
                </>                
                }

              </div>              
              
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
              <div className="row mt-20">

                  {current.matches('actions.status.new') &&
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
                  }

                  {current.matches('actions.status.inProgress') &&
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
                  }

                  {current.matches('actions.status.onHold') &&
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
                      </div>
                      <div className="col-6 right-align">
                        <p className="fs-12 stone small mt-10">ACTION</p>
                        <UpdateButton send={send}/>
                      </div>
                    </div>
                  }

                  {current.matches('actions.status.notDoing') &&
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
                  }

                  {current.matches('actions.status.resolved') &&
                    <div className="col-12 right-align">
                      <UpdateButton send={send}/>
                    </div>
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

export default IssueCard