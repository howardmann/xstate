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

const SmallButton = ({action, send}) => {
  return (
    <span style={{marginLeft: '5px'}}>
      <button style={{fontSize: '8px'}} onClick={() => send(action)}>{action}</button>
    </span>    
  )
}

const CommentInput = ({send}) => {
  return (
    <div style={{backgroundColor: 'lightblue'}}>
      <p>Add Comment</p>
      <textarea id="" cols="30" rows="4" placeholder="Enter comment" autoFocus></textarea>
      <p>
        <button onClick={() => send('SUBMIT')}>ADD COMMENT</button>
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

  // Update React State when change to xState context
  React.useEffect(() => {
    handleStatusChange({id: issue.id, status: current.context.status})
    // setIssue({...issue, status: current.context.status})
  }, [current.context.status])

  // Boot xState on load. Sets context to status based on initial context
  // React.useEffect(() => {
  //   send('INIT')
  // })


  return (
    <div style={{backgroundColor: getColor(issue.status), padding: '8px', margin: '4px'}}>
      <p>Name: {issue.name} | {issue.id}</p>
      <p>Assignee: {issue.assignee}</p> 
      <p>Status: {issue.status}</p>

      {/* <small>
        <p>current.value: {JSON.stringify(current.value)}</p>
        <p>current.context: {JSON.stringify(current.context)}</p>
      </small>       */}

      {current.matches('status.new') &&
        <div style={{textAlign: 'right'}}>
          <RejectButton send={send}/>          
          <MainButton action="APPROVE" send={send}/>
        </div>
      }

      {current.matches('status.inProgress') &&
        <div style={{textAlign: 'right'}}>
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
        <div style={{textAlign: 'right'}}>
          <RejectButton send={send}/>
          <MainButton action="APPROVE" send={send}/>
        </div>
      }

      {current.matches('status.notDoing') &&
        <div style={{textAlign: 'right'}}>
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
        <div>
          <CommentInput send={send}/>
        </div>
      }

      {current.matches('email') && 
        <div style={{backgroundColor: 'lightgreen'}}>
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
  )
}

export default IssueCard