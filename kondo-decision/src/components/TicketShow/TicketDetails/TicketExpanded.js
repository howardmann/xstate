import React from 'react'
import Attachments from './Attachments'
import Tag from '../../Tag'

export default ({issue}) => (
    <div> 
        <p className="fs-12 stone small mt-10">⚠️ DESCRIPTION</p>
        <p className="fs-14">{issue.description}</p>
        <p className="fs-12 stone small mt-10">✅ SOLUTION</p>
        <p className="fs-14">{issue.solution}</p>
        <div className="row">
            <div className="col-4 truncate">
                <p className="fs-12 stone small mt-10">IMPROVE</p>
                <Tag name={issue.benefit}/>
            </div>
            <div className="col-4 truncate">
                <p className="fs-12 stone small mt-10">PRIORITY</p>
                <Tag name={issue.priority}/>
            </div>
            <div className="col-4 truncate">
                <p className="fs-12 stone small mt-10">CREATED</p>
                <p className="fs-14">{issue.raised}</p>
            </div>
        </div>

        <div className="row">
            <p className="fs-12 stone small mt-10">EQUIPMENT</p>
            <p className="fs-14">{issue.equipment}</p>
        </div>


        {issue.attachments && <Attachments issue={issue}/>}
    </div>              
)