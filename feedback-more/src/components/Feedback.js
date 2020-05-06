import React from 'react'
import {useMachine} from '@xstate/react'
import feedbackMachine from '../stateMachine/feedbackMachine'
import StarRatingComponent from 'react-star-rating-component';

const CategoryButton = (props) => {
  let {handleUpdateCategory, category, context} = props
  return (
    <button 
      onClick={() => handleUpdateCategory(category)}
      style={{border: context.category === category && '2px solid green'}}
    >
      {category}
    </button>
  )
}

const Feedback = () => {
  const [current, send] = useMachine(feedbackMachine)
  const [stars, setStars] = React.useState(0)

  const onStarClick = (stars) => {
    setStars(stars)
    if (stars === 4) { send('POSITIVE')}
    if (stars === 3) { send('NEUTRAL')}
    if (stars === 2) { send('NEUTRAL')}
    if (stars === 1) { send('NEGATIVE')}    
  }

  // XSTATE SEND HANDLERS
  const handleUpdateCategory = (category) => send('SELECT_CATEGORY', {category})

  return (
    <div style={{border: '1px solid rebeccapurple', textAlign: 'center'}}>
      {!current.matches('closed') && 
      // FEEDBACK FORM
        <div>
        <h2>Feedback Form</h2>
          {/* METADATA */}
          <div style={{background: 'gainsboro'}}>
            <small>value: {JSON.stringify(current.value)}</small>
            <small>context: {JSON.stringify(current.context)}</small>
            <small>stars: {JSON.stringify(stars)}</small>
          </div>

          {/* REACT STAR RATING COMPONENT */}
          {!current.matches('rating.success') &&
            <StarRatingComponent 
              name='Rating'
              value={stars}
              starCount={4}
              onStarClick={onStarClick}
            />
          }

          {/* POSITIVE FEEDBACK RESPONSE */}
          {(current.matches('rating.feedback.response') && (current.context.rating === 'positive')) &&
            <div>
              <p>Thank you, what went well?</p>
              <CategoryButton category="food" handleUpdateCategory={handleUpdateCategory} context={current.context}/>
              <CategoryButton category="quality" handleUpdateCategory={handleUpdateCategory} context={current.context}/>
              <CategoryButton category="smile" handleUpdateCategory={handleUpdateCategory} context={current.context}/>
              <button onClick={() => send('OTHER')}>
                other
              </button>
              <br/><br/>
              <button onClick={() => send('SUBMIT')}>SUBMIT</button>
            </div>
          }

          {/* NEUTRAL FEEDBACK RESPONSE */}
          {(current.matches('rating.feedback.response') && (current.context.rating === 'neutral')) &&
            <div>
              <p>How can we improve?</p>
              <CategoryButton category="price" handleUpdateCategory={handleUpdateCategory} context={current.context}/>
              <CategoryButton category="service" handleUpdateCategory={handleUpdateCategory} context={current.context}/>
              <button onClick={() => send('OTHER')}>
                other
              </button>
              <br/><br/>
              <button onClick={() => send('SUBMIT')}>SUBMIT</button>
            </div>
          }

          {/* FEEDBACK COMMENT */}
          {current.matches('rating.feedback.comment') && 
          <div>
            <p>Leave your comment</p>
            <textarea onChange={evt => send('UPDATE_COMMENT', {comment: evt.target.value})}/>
            <br/><br/>
            <button onClick={() => send('SUBMIT')}>SUBMIT</button>
          </div>
          }

          {/* ESCALATE RESPONSE */}
          {current.matches('rating.escalate.response') &&
          <div>
            <p>Would you like us to call you back?</p>
            <br/><br/>
            <button onClick={() => send('YES')}>YES</button>
            <button onClick={() => send('NO')}>NO</button>
          </div>
          }

          {/* ESCALATE CONTACT */}
          {current.matches('rating.escalate.contact') &&
          <div>
            <p>Best contact details</p>
            <textarea onChange={evt => send('UPDATE_CONTACT', {contact: evt.target.value})}/>
            <br/><br/>
            <button onClick={() => send('SUBMIT')}>SUBMIT</button>
          </div>
          }

          {/* ESCALATE SUCCESS */}
          {current.matches('rating.success') && 
            <div>
              <p>Thank you for your feedback!</p>            
            </div>
          }
          
          <hr/>
          <button onClick={() => send('CLOSE')}>CLOSE</button>
        </div>
      }

        

    </div>
  )
}

export default Feedback