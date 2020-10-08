import React from 'react'
import truncateWords from '../../util/truncateWords'
import { send } from 'xstate'

export default ({issue, send}) => (
    <div onClick={() => send('TOGGLE_DETAILS')}> 
        <p className="fs-12 stone small mt-10">⚠️ DESCRIPTION</p>
        <p className="fs-14">{truncateWords(issue.description, 19)}</p>
        <p className="fs-12 stone small mt-10">✅ SOLUTION</p>
        <p className="fs-14">{truncateWords(issue.solution, 19)}</p>
        <p className="fs-12 stone small mt-10">IMPROVE</p>
        <p className="fs-14">{issue.benefit}</p>
    </div>              
)