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
    "New": 'blue',
    "In Progress": 'green',
    "On Hold": 'orange',
    "Resolved": 'chartreuse',
    "Not Doing": 'gainsboro'    
  }
  return colorIndex[status]
}

const MainButton = ({action, send}) => {
  return (
    <span style={{marginRight: '5px'}}>
      <button style={{backgroundColor: 'green', color: 'white'}} onClick={() => send(action)}>✨{action}✨</button>
    </span>    
  )
}

const UpdateButton = ({send}) => {
  return (
    <span style={{marginRight: '5px'}}>
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
    <div>
      <p>Add Comment</p>
      <input type="text"/>
      <button onClick={() => send('SUBMIT')}>Add Comment</button>
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
  React.useEffect(() => {
    send('INIT')
  })


  return (
    <div style={{border: `2px solid ${getColor(issue.status)}`, padding: '3px', margin: '3px'}}>
      <p>Name: {issue.name} | {issue.id}</p>
      <p>Assignee: {issue.assignee}</p> 
      <p>Status: {issue.status}</p>

      <small>
        <p>current.value: {JSON.stringify(current.value)}</p>
        <p>current.context: {JSON.stringify(current.context)}</p>
      </small>      

      {current.matches('status.new') &&
        <>
          <MainButton action="APPROVE" send={send}/>
          <RejectButton send={send}/>          
        </>
      }

      {current.matches('status.inProgress') &&
        <>
          <button 
            style={{backgroundColor: 'green', color: 'white', marginRight: '5px'}}
            onClick={() => send('RESOLVED')}
          >
              ✔️ RESOLVE
          </button>

          <UpdateButton send={send}/>
          
        </>
      }

      {current.matches('status.onHold') &&
        <>
          <MainButton action="APPROVE" send={send}/>
          <RejectButton send={send}/>
        </>
      }

      {current.matches('status.notDoing') &&
        <>
          <MainButton action="APPROVE" send={send}/>
        </>
      }      
      {!current.matches('commentInput') &&
        <div style={{textAlign: 'right'}}>
          <button 
            style={{backgroundColor: 'blue', color: 'white'}}
            onClick={() => send('ADD_COMMENT')}
          >
              😃 Add Comment
          </button>
        </div>      
      }

      {current.matches('commentInput') &&
        <div>
          <CommentInput send={send}/>
        </div>
      }

    </div>
  )
}

export default IssueCard