import React from 'react'
import Attachments from './Attachments'

export default ({issue}) => (
    <div> 
        <p className="fs-12 stone small mt-10">⚠️ DESCRIPTION</p>
        <p className="fs-14">{issue.description}</p>
        <p className="fs-12 stone small mt-10">✅ SOLUTION</p>
        <p className="fs-14">{issue.solution}</p>
        <p className="fs-12 stone small mt-10">IMPROVE</p>
        <p className="fs-14">{issue.benefit}</p>            
        <p className="fs-12 stone small mt-10">EQUIPMENT</p>
        <p className="fs-14">{issue.equipment}</p>            
        <p className="fs-12 stone small mt-10">ISSUE RAISED</p>
        <p className="fs-14">{issue.raised}</p>                  
        {issue.attachments && <Attachments issue={issue}/>}
    </div>              
)