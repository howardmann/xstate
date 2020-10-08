import React from 'react'

const CIM_URL = "https://dl.airtable.com/.attachments/109d5ff9630bc775ebc23a68ed9ef7c7/2f303f40/ScreenShot2020-07-31at3.56.57pm.png"

export default ({url = CIM_URL}) => (
    <img
    style={{
        objectFit: 'cover',
        borderRadius: '50%',
        border: '1px solid hsla(0,0%,53.3%, .4 )',
        height: '48px',
        width: '48px',
        display: 'inline-block',
        marginRight: '8px',
        flexShrink: 0
    }}    
    src={url}/>
)