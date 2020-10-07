import React from 'react';
import TicketRow from './TicketRow'
import {sortBy} from 'lodash';

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