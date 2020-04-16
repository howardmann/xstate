import React from 'react';
import {TrafficLightMachine} from './TrafficLightMachine'
import {interpret} from 'xstate'
import styled from 'styled-components'


class TrafficLight extends React.Component {
  state = {
    // xstate current state value
    current: TrafficLightMachine.initialState,
    // timer to clear setInterval
    timer: null,
    // timer elapsed
    elapsed: 0
  }

  service = interpret(TrafficLightMachine).onTransition(current => 
    this.setState({current})
  )

  componentDidMount(){
    this.service.start()
  }

  componentWillUnmount(){
    this.service.stop()
  }

  startTimer() {
    let elapsed = this.state.elapsed
    // send TIMER action every 1 second with event/ payload of seconds elapsed
    let timer = setInterval(() => {
      elapsed++
      this.service.send('TIMER', {elapsed})
      this.setState({elapsed})
      
      // reset counter after 10 seconds
      if (elapsed > 9) elapsed = 0
    }, 1000)
    this.setState({timer})
  }

  stopTimer(){
    let timer = clearInterval(this.state.timer)
    // Clear timer and reset elapsed
    this.setState({timer, elapsed: 0})
  }
  
  render() {
    const {current} = this.state
    const {send} = this.service
    const Circle = styled.div`
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background-color: grey;
      border: 1px solid white;
      margin: 3px;
    `

    return (
      <div>
        <p>current: {JSON.stringify(current.value)}</p>
        <p>timer: {this.state.timer}</p>
        <p>elapsed: {this.state.elapsed}</p>
        
        <hr/>
        <p>LIGHTS</p>
        <div style={{backgroundColor: "black", height: "80px", width: "28px", textAlign: "center", padding: "1px"}}>
          <Circle style={{backgroundColor: current.matches('broken') ? 'black' : current.matches('normal.lit.red') ? "red": "grey"}}/>
          <Circle style={{backgroundColor: current.matches('broken') ? 'black' : current.matches('normal.lit.yellow') ? "orange": "grey"}}/>
          <Circle style={{backgroundColor: current.matches('broken') ? 'black' : current.matches('normal.lit.green') ? "green": "grey"}}/>
        </div>

        <hr/>
        <p>POWER ON/ OFF</p>
        <button 
          onClick={() => send('TURN_ON')}
          disabled={current.matches('normal.lit') || current.matches('broken') ? true : false}
        >
          TURN_ON
        </button>

        <button 
          onClick={() => {
            send('TURN_OFF')
            this.stopTimer()
          }}
          disabled={current.matches('normal.unlit') || current.matches('broken') ? true : false}
        >
          TURN_OFF
        </button>

        <hr/>
        <p>TIMER</p>
        <button 
          onClick={() => this.startTimer()}
          disabled={current.matches('normal.unlit') || this.state.timer || current.matches('broken') ? true : false}
        >
          TIMER_ON
        </button>
        <button 
          onClick={() => {
            this.stopTimer()
            send('RESET')
          }}
          disabled={this.state.timer ? false : true}
        >
          RESET
        </button>


        <hr/>
        <p>BREAK/ FIX</p>
        <button 
          onClick={() => {
            send('BREAK')
            this.stopTimer()
          }}
          disabled={current.matches('broken') ? true : false}
        >
          BREAK
        </button>

        <button 
          onClick={() => send('REPAIR')}
          disabled={current.matches('broken') ? false : true}
        >
          REPAIR
        </button>

      </div>
    );
  }
}


export default TrafficLight;
