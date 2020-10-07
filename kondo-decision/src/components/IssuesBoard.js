import React from 'react';
import TicketRow from './tickets/TicketRow'
import {sortBy} from 'lodash';

const initialData = [
  {
    id: '1',
    name: 'Excessive operation',
    status: 'New',
    assignee: 'bill',
    email: 'bill@email.com'
  },
  {
    id: '2',
    name: 'Status Mismatch',
    status: 'New',
    assignee: 'bob',
    email: 'bob@email.com'
  },
  {
    id: '3',
    name: 'Food court open',
    status: 'New',
    assignee: 'jane',
    email: 'jane@email.com'
  },
  {
    id: '4',
    name: 'Magic mountain',
    status: 'Resolved',
    assignee: 'billy',
    email: 'billy@email.com'
  },
  {
    id: '5',
    name: 'Turn gas office',
    status: 'Not Doing',
    assignee: 'jason',
    email: 'jason@email.com'
  },
  {
    id: '6',
    name: 'Stage 4 Restriction',
    status: 'On Hold',
    assignee: 'teddy',
    email: 'teddy@email.com'
  },
  {
    id: '7',
    name: 'Stage 3 Restriction',
    status: 'Resolved',
    assignee: 'pope',
    email: 'pope@email.com'
  },
  {
    id: '8',
    name: 'AHU CO2 sensor replace',
    status: 'New',
    assignee: 'karen',
    email: 'karen@email.com'
  },
  {
    id: '9',
    name: 'Tenant complaint',
    status: 'Resolved',
    assignee: 'tell',
    email: 'tell@email.com'
  }

]

const sortByStatus = (data) => {
  const sortRank = {
    "New": 1,
    "In Progress": 2,
    "On Hold": 3,
    "Resolved": 4,
    "Not Doing": 5
  }

  return sortBy(data, function(el){
    return sortRank[el.status]
  })
}


const IssuesBoard = ({data}) => {  
  // React Issue State
  const [issues, setIssues] = React.useState(data)
  
  const handleStatusChange = ({id, status, category}) => {
    setIssues(
      issues.map(issue => {
        if(issue.id === id){
          return {...issue, category, status}
        }
        return issue
      }))
  }

  const hasInbox = () => {
    return issues.filter(el => el.category === 'inbox').length
  }

  
  return (
    <>
      <div>
          <h3>Inbox</h3>
          {sortByStatus(issues).filter(el => el.category === 'inbox').map(issue => <TicketRow key={issue.id} data={issue} handleStatusChange={handleStatusChange}/>)}
          {!hasInbox() && 
          <div style={{margin: '15px', padding: '15px', textAlign: 'center'}}>
            <p>✨ Nothing new for you ✨</p>
          </div>
            
          }
      </div>
      <hr/>
      <div style={{marginTop: '20px'}}>
          <h3>Previous</h3>
          {sortByStatus(issues).filter(el => el.category === 'previous').map(issue => <TicketRow key={issue.id} data={issue} handleStatusChange={handleStatusChange}/>)}
      </div>
    </>
  )
}

export default IssuesBoard