import React from 'react';
import {TrafficLightMachine} from './TrafficLightMachine'
import {interpret} from 'xstate'

class TrafficLight extends React.Component {
  state = {
    current: TrafficLightMachine.initialState,
    timer: null
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
    let timer = setInterval(() => this.service.send('TIMER'), 3000)
    this.setState({timer})
  }

  stopTimer(){
    let timer = clearInterval(this.state.timer)
    this.setState({timer})
  }

  render() {
    const {current} = this.state
    const {send} = this.service

    return (
      <div>
        <p>current: {JSON.stringify(current.value)}</p>
        <p>timer: {this.state.timer}</p>

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
        <p>TIMER ON/ OFF</p>
        <button 
          onClick={() => this.startTimer()}
          disabled={current.matches('normal.unlit') || this.state.timer || current.matches('broken') ? true : false}
        >
          TIMER_ON
        </button>
        <button 
          onClick={() => this.stopTimer()}
          disabled={this.state.timer ? false : true}
        >
          TIMER_OFF
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
