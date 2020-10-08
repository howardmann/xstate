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
            <div className="col-6">
                <p className="fs-12 stone small mt-10">IMPROVE</p>
                <Tag name={issue.benefit}/>
            </div>
            <div className="col-6">
                <p className="fs-12 stone small mt-10">PRIORITY</p>
                <Tag name={issue.priority}/>
            </div>
        </div>

        <div className="row">
            <div className="col-6 pr-5">
                <p className="fs-12 stone small mt-10">EQUIPMENT</p>
                <p className="fs-14">{issue.equipment}</p>
            </div>
            <div className="col-6">
                <p className="fs-12 stone small mt-10">ISSUE RAISED</p>
                <p className="fs-14">{issue.raised}</p>
            </div>
        </div>

        {issue.attachments && <Attachments issue={issue}/>}
    </div>              
)