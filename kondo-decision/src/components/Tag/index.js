import React from 'react'

const Tag = ({name}) => {

    const getColor = (name) => {
        const colorIndex = {
            "New": 'teal',
            "In Progress": 'lime',
            "On Hold": 'orange',
            "Resolved": 'green',
            "Not Doing": 'gray',
            "Urgent": 'red',
            "Maintenance": 'stone',
            "Monitor": 'blue',
            "🙂 Occupant": 'blue',
            "⚙️ System": 'storm',
            "⚡ Energy": 'green'
        }
        return colorIndex[name]
    }
      
    return (
        <span className={`bg-${getColor(name)} fs-12 white px-5 rounded truncate`}>
            {(name === 'Urgent') && 
            <span> ⚠️ </span>
            }
            {name}
        </span>
    )
}

export default Tag