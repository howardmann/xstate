import React from 'react'
import truncateWords from '../../../util/truncateWords'

export default ({issue}) => (
    <div> 
        <p className="fs-12 stone small mt-10">⚠️ DESCRIPTION</p>
        <p className="fs-14">{truncateWords(issue.description, 30)}</p>
        <p className="fs-12 stone small mt-10">✅ SOLUTION</p>
        <p className="fs-14">{truncateWords(issue.solution, 30)}</p>
        <p className="fs-12 stone small mt-10">IMPROVE</p>
        <p className="fs-14">{issue.benefit}</p>
    </div>              
)