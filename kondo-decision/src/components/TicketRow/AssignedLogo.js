import React from 'react'

export default ({issue}) => (
    
    // <img height="50" src={issue.companyLogo} alt=""/>    
    <div
        style={{
            backgroundImage: `url("${issue.companyLogo}")`,
            width: '70px',
            height: '55px',
            backgroundPosition: 'center',
            backgroundSize: 'auto 140%'
        }}>
    </div>
)