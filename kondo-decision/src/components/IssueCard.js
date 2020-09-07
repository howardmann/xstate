import React from 'react';
import {useMachine} from '@xstate/react'
import actionMachine from '../stateMachines/actionMachine'
import { send } from 'xstate/lib/actionTypes';

// const initialData = {
//   name: 'Excessive operation',
//   status: 'In Progress',
//   assignee: 'bill'
// }

const getColor = (status) => {
  const colorIndex = {
    "New": 'teal',
    "In Progress": 'green',
    "On Hold": 'orange',
    "Resolved": 'emerald',
    "Not Doing": 'gray',
    "Urgent": 'red',
    "Maintenance": 'stone',
    "Monitor": 'newblue' 
  }
  return colorIndex[status]
}

const MainButton = ({action, send}) => {
  return (
    <span style={{margin: '0px 8px'}}>
      <button class="btn btn-primary" onClick={() => send(action)}>✨{action}✨</button>
    </span>    
  )
}

const UpdateButton = ({send}) => {
  return (
    <span style={{margin: '0px 8px'}}>
      <button class="btn btn-outline stone border-stone"
      onClick={() => send('ADD_COMMENT')}>👋 UPDATE</button>
    </span>    
  )
}

const RejectButton = ({send}) => {
  return (
    <button 
      class="btn btn-outline stone border-stone"
      onClick={() => send('REJECT')}
    >
        👎 REJECT
    </button>
  )  
}

const CommentInput = ({send, current}) => {
  return (
    <div class="border p-5">
      <h3 class="center">Add Comment</h3>
      <textarea class="width-100" id="" cols="30" rows="4" placeholder="Enter comment"></textarea>

      <div className="row">
        <div className="col-2 left-align">
          <button class="btn btn-outline" onClick={() => send('CLOSE')}>🔙</button>        
        </div>
        <div className="col-10 right-align">
          { current.matches('actions.comment.general') &&
            <button class="btn btn-primary" onClick={() => {
              send('SUBMIT')
            }}>ADD COMMENT</button>
          }
          { current.matches('actions.comment.resolved') &&
            <button class="btn btn-primary" onClick={() => send('SUBMIT')}>✔️ RESOLVE</button>
          }
        </div>
      </div>        
    </div>
  )
}

const IssueCard = ({data, handleStatusChange}) => {
  const issue = data
  // xState machine with initial context of issue status
  const [current, send] = useMachine(actionMachine.withContext({status: issue.status, comment: ''}))

  // Update React State when change to xState context
  React.useEffect(() => {
    handleStatusChange({id: issue.id, status: current.context.status})
  }, [current.context.status])

  return (
    <div class="row border rounded p-5 my-5">
        <div 
          onClick={() => send('TOGGLE')}
          class="col-2 cursor">
          <img height="40" src={issue.companyLogo} alt=""/>
          <p class={`fs-12 bold ${getColor(issue.status)}`}>
            {issue.status.toUpperCase()}
          </p>
          <p class={`fs-12 truncate ${getColor(issue.priority)}`}>
            {issue.priority}
          </p>

        </div>
        <div class="col-10">
          <div 
            onClick={() => send('TOGGLE')} 
            class="row cursor"
          >
            <p class="truncate">{issue.name}</p>
            <p class="truncate fs-14">{issue.assigned}</p>
          </div>
          <div class="row">
            <div class="col-12">
              {/* ACTION BUTTONS */}
              <div class="right-align">
                {current.matches('actions.status.new') &&
                  <div>
                    <RejectButton send={send}/>          
                    <MainButton action="APPROVE" send={send}/>
                  </div>
                }

                {current.matches('actions.status.inProgress') &&
                  <div>
                    <UpdateButton send={send}/>

                    <button 
                      class="btn btn-primary"
                      onClick={() => send('RESOLVED')}
                    >
                        ✔️ RESOLVE
                    </button>

                    
                  </div>
                }

                {current.matches('actions.status.onHold') &&
                  <div>
                    <RejectButton send={send}/>
                    <MainButton action="APPROVE" send={send}/>
                  </div>
                }

                {current.matches('actions.status.notDoing') &&
                  <div>
                    <button 
                      onClick={() => send('HOLD')}
                      class="btn btn-outline stone border-stone"
                    >
                      ✋ON HOLD
                    </button>
                    <MainButton action="APPROVE" send={send}/>
                  </div>
                }      

                {current.matches('actions.comment') &&
                  <div class="right-align">
                    <CommentInput send={send} current={current}/>
                  </div>
                }

                {current.matches('actions.email') && 
                  <div class="left-align p-5 border">
                    <h3 class="center">Send Email</h3>
                    <p>To:</p>
                    <p><input class="width-100" type="email" value={issue.email}/></p>
                    <p>Cc:</p>
                    <p><input class="width-100" type="email" value="engineering@cim.io"/></p>
                    <p>Subject:</p>
                    <p><input class="width-100" type="text" value={issue.name}/></p>
                    <p>Body:</p>
                    <textarea class="width-100" cols="30" rows="5" placeholder="Prefill issue details with CTA link"></textarea>
                    <div class="row">                                  
                      <div className="col-2">
                        <button class="btn btn-outline" onClick={() => send('CLOSE')}>🔙</button>            
                      </div>
                      <div className="col-10 right-align">
                        <button class="btn btn-primary right-align" onClick={() => {
                          send('SUBMIT')
                          alert('📧 Email Sent')
                        }}>📧 SUBMIT</button>
                      </div>                      
                    </div>
                      

                  </div>
                }
              </div>
            </div>
          </div>
          
          {current.matches('issue.active') &&
            <div class="row cursor"
                onClick={() => send('TOGGLE')}
            >
              <p class="fs-14">Description:</p>
              <p class="fs-12">{issue.description}</p>
              <p class="fs-14">Solution:</p>
              <p class="fs-12">{issue.solution}</p>
              <p class="fs-14">Improve:</p>
              <p class="fs-12">{issue.benefit}</p>            
              <p class="fs-14">Equipment:</p>
              <p class="fs-12">{issue.equipment}</p>            
              <p class="fs-14">Tenants:</p>
              <p class="fs-12">{issue.tenant}</p>       
              <button onClick={() => alert('Open Edit Issue Form')}>Edit</button>                 
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