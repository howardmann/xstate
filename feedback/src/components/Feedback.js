import React, {useState} from 'react'
import feedbackMachine from '../stateMachines/feedbackMachine'
import {useMachine} from '@xstate/react'
import useOnClickOutside from 'use-onclickoutside'

const Feedback = () => {
  let [current, send] = useMachine(feedbackMachine)
  let [comment, setComment] = useState('')
  
  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }
  const handleClose = () => {
    console.log('whoaahaha');
    setComment('')
    send('CLOSE')
  }
  
  // detect onclickoutside library
  const onClickOutsideRef = React.useRef(null)
  useOnClickOutside(onClickOutsideRef, handleClose)

  return (
    <div style={{border: '3px solid rebeccapurple', textAlign: 'center', width: '50%'}}>
      <h3>FeedbackForm</h3>

      {/* STATE MACHINE AND STATE */}
      <div style={{backgroundColor: 'gainsboro', marginBottom: '15px'}}>
        <small>
          <p>current.value: {JSON.stringify(current.value)}</p>
          <p>current.context: {JSON.stringify(current.context)}</p>
          <p>comment: {JSON.stringify(comment)}</p>
        </small>
      </div>

      {/* IDLE */}
      {current.matches('idle') && 
        <button onClick={() => send('CLICK')}>Feedback Click</button>
      }

      {/* PROMPT */}
      {current.matches('feedback.prompt') &&
        <div ref={onClickOutsideRef} style={{border: '2px solid salmon'}}>
          <h3>{current.context.message}</h3>
          <button onClick={() => send('POSITIVE')}>😀</button>
          <button onClick={() => send('NEGATIVE')}>😡</button>
        </div>
      }

      {/* COMMENT */}
      { current.matches('feedback.comment') &&
        <div ref={onClickOutsideRef} style={{border: '2px solid palegoldenrod'}}>
          <h3>{current.context.message}</h3>
          <textarea value={comment} onChange={handleCommentChange} placeholder="leave a comment"/>
          <br/>
          <button onClick={() => send('SUBMIT')}>SUBMIT</button>
          <br/><hr/>
          <button onClick={() => send('POSITIVE')}>😀</button> <span>I meant yes</span>
        </div>
      }
      
      {/* CONFIRM */}
      {(current.matches('feedback.positiveConfirm') || current.matches('feedback.negativeConfirm')) &&
        <div ref={onClickOutsideRef} style={{border: '2px solid chartreuse'}}>
          <h3>{current.context.message}</h3>          
        </div>
      }

      {/* CLOSE IF NOT IDLE */}
      {!current.matches('idle') &&
        <div>
          <br/><br/><hr/>
          <button onClick={handleClose}>❌</button>  
        </div>        
      }      
    </div>
  )
}

export default Feedback