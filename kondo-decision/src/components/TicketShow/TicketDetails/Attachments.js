import React from 'react'

export default ({issue}) => {
    return (
        <div>
            <p className="fs-12 stone small mt-10">ATTACHMENTS</p>
            {issue.attachments.map(el => {
                return <a href={el} target="_blank"><img height="80" src={el}/></a>
            })}
        </div>
    )
}