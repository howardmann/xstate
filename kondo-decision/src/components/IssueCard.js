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
    "New": 'lightcyan',
    "In Progress": 'lightgreen',
    "On Hold": 'lightgoldenrodyellow',
    "Resolved": 'lawngreen',
    "Not Doing": 'lightgrey'    
  }
  return colorIndex[status]
}

const MainButton = ({action, send}) => {
  return (
    <span style={{margin: '0px 8px'}}>
      <button style={{backgroundColor: 'green', color: 'white'}} onClick={() => send(action)}>✨{action}✨</button>
    </span>    
  )
}

const UpdateButton = ({send}) => {
  return (
    <span style={{margin: '0px 8px'}}>
      <button style={{backgroundColor: 'blue', color: 'white'}} 
      onClick={() => send('ADD_COMMENT')}>👋 UPDATE</button>
    </span>    
  )
}

const RejectButton = ({send}) => {
  return (
    <button 
      style={{backgroundColor: 'gainsboro', marginLeft: '5px'}}
      onClick={() => send('REJECT')}
    >
        👎 REJECT
    </button>
  )  
}

const CommentInput = ({send, current}) => {
  return (
    <div style={{backgroundColor: 'lightblue'}}>
      <p>Add Comment</p>
      <textarea id="" cols="30" rows="4" placeholder="Enter comment" autoFocus></textarea>
      <p>
        { current.matches('comment.general') &&
          <button onClick={() => {
            send('SUBMIT')
            alert('Comment Added')
          }}>ADD COMMENT</button>
        }
        { current.matches('comment.resolved') &&
          <button style={{backgroundColor: 'green', color: 'white'}} onClick={() => send('SUBMIT')}>✔️ RESOLVE</button>
        }
      </p>      
      <p>
        <button onClick={() => send('CLOSE')}>🔙</button>        
      </p>
    </div>
  )
}

const IssueCard = ({data, handleStatusChange}) => {
  const issue = data
  // xState machine with initial context of issue status
  const [current, send] = useMachine(actionMachine.withContext({status: issue.status, comment: ''}))

  // Toggle to show/ hide Issue
  const [isOpen, setOpen] = React.useState(false)
  const toggleOpenClose = () => setOpen(!isOpen)

  // Update React State when change to xState context
  React.useEffect(() => {
    handleStatusChange({id: issue.id, status: current.context.status})
  }, [current.context.status])



  return (
    <div onClick={toggleOpenClose} class="row" style={{backgroundColor: getColor(issue.status), padding: '8px', margin: '4px'}}>
      <div class="col-2">
        <img height="40" src={issue.companyLogo} alt=""/>
        <p class="fs-12">
          {issue.status}
        </p>
        <p class="fs-12 truncate">
          {issue.priority}
        </p>

      </div>
      <div class="col-10">
        <div class="row">
          <p class="truncate bold">{issue.name}</p>
          <p class="truncate fs-14">{issue.assigned}</p>
        </div>
        <div class="row">
          <div class="col-12">
            {/* ACTION BUTTONS */}
            <div class="right-align">
              {current.matches('status.new') &&
                <div>
                  <RejectButton send={send}/>          
                  <MainButton action="APPROVE" send={send}/>
                </div>
              }

              {current.matches('status.inProgress') &&
                <div>
                  <UpdateButton send={send}/>

                  <button 
                    style={{backgroundColor: 'green', color: 'white', marginRight: '5px'}}
                    onClick={() => send('RESOLVED')}
                  >
                      ✔️ RESOLVE
                  </button>

                  
                </div>
              }

              {current.matches('status.onHold') &&
                <div>
                  <RejectButton send={send}/>
                  <MainButton action="APPROVE" send={send}/>
                </div>
              }

              {current.matches('status.notDoing') &&
                <div>
                  <button 
                    onClick={() => send('HOLD')}
                    style={{backgroundColor: 'palegoldenrod'}}
                  >
                    ✋ON HOLD
                  </button>
                  <MainButton action="APPROVE" send={send}/>
                </div>
              }      

              {current.matches('comment') &&
                <div class="right-align">
                  <CommentInput send={send} current={current}/>
                </div>
              }

              {current.matches('email') && 
                <div class="left-align p-10" style={{backgroundColor: 'lightgreen'}}>
                  <h2>Send Email</h2>
                  <p>To:</p>
                  <p><input type="email" value={issue.email}/></p>
                  <p>Cc:</p>
                  <p><input type="email" value="engineering@cim.io"/></p>
                  <p>Subject:</p>
                  <p><input type="text" value={issue.name}/></p>
                  <p>Body:</p>
                  <textarea cols="30" rows="5" placeholder="Leave a comment"></textarea>
                  <p>                                  
                    <button onClick={() => {
                      send('SUBMIT')
                      alert('📧 Email Sent')
                    }}>📧 SUBMIT</button>
                  </p>
                  <p>
                    <button onClick={() => send('CLOSE')}>🔙</button>            
                  </p>

                </div>
              }
            </div>
          </div>
        </div>
        
        {isOpen &&
          <div class="row">
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
      {/* <p>Status: {issue.status}</p> */}

      {/* <small>
        <p>current.value: {JSON.stringify(current.value)}</p>
        <p>current.context: {JSON.stringify(current.context)}</p>
      </small>       */}
      

    </div>
  )
}

export default IssueCard