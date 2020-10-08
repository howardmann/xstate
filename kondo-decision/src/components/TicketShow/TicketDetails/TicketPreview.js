import React from 'react'
import Tag from '../../Tag'
import truncateWords from '../../util/truncateWords'

export default ({issue, send}) => (
    <div onClick={() => send('TOGGLE_DETAILS')}> 
        <p className="fs-12 stone small mt-10">⚠️ DESCRIPTION</p>
        <p className="fs-14">{truncateWords(issue.description, 19)}</p>
        <p className="fs-12 stone small mt-10">✅ SOLUTION</p>
        <p className="fs-14">{truncateWords(issue.solution, 19)}</p>
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
    </div>              
)