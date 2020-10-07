import React from 'react'

export default ({issue}) => {
    return (
      <a href={issue.mailto} className="btn btn-primary" target="_blank">✨ Approve ✨</a>    
    )
  }
  