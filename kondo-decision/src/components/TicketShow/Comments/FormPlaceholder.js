import React from 'react'

export default ({current, send}) => {
    return (
        <div style={{display: 'flex'}} className="row pl-5">
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
                src="https://dl.airtable.com/.attachments/109d5ff9630bc775ebc23a68ed9ef7c7/2f303f40/ScreenShot2020-07-31at3.56.57pm.png"/>
            <div style={{display: "flex", flexGrow: 1, alignItems: 'center', padding: '6px', color: 'hsla(0,0%,6.7%, .6 )'}} width="100" className="border">
                <p>Add a comment...</p>
            </div>
        </div>
    )
}