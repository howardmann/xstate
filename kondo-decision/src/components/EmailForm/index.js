import React from 'react'

const EmailForm = ({issue, send}) => {
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
            <textarea class="width-100" cols="30" rows="5" placeholder="Prefill issue details with CTA link"></textarea>
            <div class="row">                                  
            <div className="col-2">
                <button class="btn btn-outline" onClick={() => send('CLOSE')}>🔙</button>            
            </div>
            <div className="col-10 right-align">
                <button class="btn btn-primary right-align" onClick={() => {
                send('SUBMIT')
                alert('📧 Email Sent')
                }}>📧 SUBMIT</button>
            </div>                      
            </div>                  
        </div>        
    )
}

export default EmailForm