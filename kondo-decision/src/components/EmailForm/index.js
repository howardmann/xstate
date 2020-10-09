import React from 'react'

const EmailForm = ({issue, send}) => {
    const emailForm = `Issue:\n${issue.name}\n\nEquipment:\n${issue.equipment}\n\nAction Required:\n${issue.solution}\n\nTap Link Below When Actioned:\n[TODO: link_to_issue]`

    return (
        <div class="left-align p-5 border">
            <h3 class="center">Send Email</h3>
            <p>To:</p>
            <p><input class="width-100" type="email" value={issue.email}/></p>
            <p>Cc:</p>
            <p><input class="width-100" type="email" value="engineering@cim.io"/></p>
            <p>Subject:</p>
            <p><input class="width-100" type="text" value={issue.name}/></p>
            <p>Body:</p>
            <textarea value={emailForm} class="width-100" cols="30" rows="15">
            </textarea>
            <div class="row right-align">                                  
                <button class="btn btn-outline mr-10" onClick={() => send('CLOSE_EMAIL')}>CANCEL</button>            
                <button class="btn btn-primary right-align" onClick={() => {
                send('SUBMIT_EMAIL')
                alert('📧 Email Sent')
                }}>SUBMIT</button>
            </div>                  
        </div>        
    )
}

export default EmailForm