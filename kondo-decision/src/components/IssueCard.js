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
      <button onClick={() => send(action)}>{action}</button>
    </span>    
  )
}

const SmallButton = ({action, send}) => {
  return (
    <span style={{marginLeft: '5px'}}>
      <button style={{fontSize: '8px'}} onClick={() => send(action)}>{action}</button>
    </span>    
  )
}


const IssueCard = ({data, handleStatusChange}) => {
  const issue = data
  // xState machine with initial context of issue status
  const [current, send] = useMachine(actionMachine.withContext({status: issue.status}))

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
          <MainButton action="REJECT" send={send}/>
          <div style={{textAlign: 'right'}}>
            <SmallButton action="HOLD" send={send}/>
          </div>
        </>
      }

      {current.matches('status.inProgress') &&
        <>
          <MainButton action="RESOLVED" send={send}/>
          <div style={{textAlign: 'right'}}>
            <SmallButton action="HOLD" send={send}/>
            <SmallButton action="REJECT" send={send}/>
          </div>
        </>
      }

      {current.matches('status.onHold') &&
        <>
          <MainButton action="APPROVE" send={send}/>
          <MainButton action="REJECT" send={send}/>
        </>
      }

      {current.matches('status.notDoing') &&
        <>
          <MainButton action="APPROVE" send={send}/>
          <MainButton action="HOLD" send={send}/>
        </>
      }

    </div>
  )
}

export default IssueCard