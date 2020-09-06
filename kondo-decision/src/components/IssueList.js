import React from 'react';
import IssueCard from './IssueCard'
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
    status: 'In Progress',
    assignee: 'bob',
    email: 'bob@email.com'
  },
  {
    id: '3',
    name: 'Food court open',
    status: 'Resolved',
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


const IssueList = ({data = initialData}) => {
  // React Issue State
  const [issues, setIssues] = React.useState(data)
  
  const handleStatusChange = ({id, status}) => {
    setIssues(
      issues.map(issue => {
        if(issue.id === id){
          return {...issue, status}
        }
        return issue
      }))
  }

  return (
    <div>
        {sortByStatus(issues).map(issue => <IssueCard key={issue.id} data={issue} handleStatusChange={handleStatusChange}/>)}
    </div>
  )
}

export default IssueList