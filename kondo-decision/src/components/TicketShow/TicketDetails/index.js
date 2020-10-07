import React from 'react'


export default ({issue, current, send}) => {
    return (
        <div> 
            <p className="fs-12 stone small mt-10">⚠️ DESCRIPTION</p>
            <p className="fs-14">{issue.description}</p>
            <p className="fs-12 stone small mt-10">✅ SOLUTION</p>
            <p className="fs-14">{issue.solution}</p>
            <p className="fs-12 stone small mt-10">IMPROVE</p>
            <p className="fs-14">{issue.benefit}</p>            
            <p className="fs-12 stone small mt-10">EQUIPMENT</p>
            <p className="fs-14">{issue.equipment}</p>            
            {issue.tenants.length > 0 &&
                <>
                <p className="fs-12 stone small mt-10">TENANTS AFFECTED</p>              
                <p className="fs-14">{issue.tenants}</p>
                </>
            }

            <p className="fs-12 stone small mt-10">ISSUE RAISED</p>
            <p className="fs-14">{issue.raised}</p>      
            
            {/* ATTACHMENTS */}
            {issue.attachments && <p className="fs-12 stone small mt-10">ATTACHMENTS</p>}
            {(issue.attachments) &&
                issue.attachments.map(el => {
                return <a href={el} target="_blank">
                    <img height="80" src={el}/>
                </a>
                })
            }
        </div>              

    )
}