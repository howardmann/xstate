import React from 'react'


const TicketStatus = ({issue}) => {

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
      
    return (
        <span className={`bg-${getColor(issue.status)} fs-12 white px-5 rounded truncate`}>
            {(issue.priority === 'Urgent') && 
            <span> ⚠️ </span>
            }
            {issue.status}
        </span>
    )
}

export default TicketStatus