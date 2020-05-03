import React from 'react'
import {useMachine} from '@xstate/react'
import lightMachine from '../stateMachines/lightMachine'
import NotyfContext from './NotyfContext'

const Light = () => {
  const [current, send] = useMachine(lightMachine)
  // Toast
  const notyf = React.useContext(NotyfContext)

  const brokenCB = () => notyf.error('Light is broken');
  const repairCB = () => notyf.success('repaired CB');


  return (
    <div>
      <div style={{backgroundColor: 'gainsboro'}}>
        <small>current: {JSON.stringify(current.value)}</small>
      </div>
      
      {current.matches('light.active') &&
        <h1>💡</h1>
      }
      {current.matches('light.inactive') &&
        <h1>💤</h1>
      }
      {current.matches('broken') &&
        <h1>❌</h1>
      }

      <button disabled={current.matches('broken')} onClick={() => send('TOGGLE')}>TOGGLE</button>
      <hr/>
      {!current.matches('broken') &&
        <button onClick={() => send('BREAK', {cb: brokenCB})}>BREAK</button>
      }
      {current.matches('broken') &&
        <button onClick={() => send('REPAIR', {cb: repairCB})}>REPAIR</button>
      }
      
    </div>
  )
}
export default Light