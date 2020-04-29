# XState Chart Traffic Lights

Demo link:
http://xstatetrafficlight.surge.sh/

XState Chart
https://xstate.js.org/viz/?gist=1b9e1bcf75b1fed19190adc9f39b895e
![traffic-light](trafficlight.png)


```javascript
const TrafficLightMachine = Machine({
  id: 'TrafficLight',
  initial: "normal",
  states: {
    normal: {
      initial: "unlit",
      on: {
        BREAK: "broken",
        RESET: "normal.lit"
      },
      states: {
        unlit: {
          on: {
            TURN_ON: "lit"
          }
        },
        lit: {
          initial: "green",
          on: {
            TURN_OFF: "unlit"
          },
          states: {
            green: {
              on: {
                TIMER: {
                  target: "yellow",
                  // Additional guard condition required
                  cond: (_context, event) => event.elapsed >= 3 ? true : false
                }
              }
            },
            yellow: {
              on: {
                TIMER: {
                  target: "red", 
                  cond: (_context, event) => event.elapsed >= 5 ? true : false
                }
              }
            },
            red: {
              on: {
                TIMER: {
                  target: "green",
                  cond: (_context, event) => event.elapsed >= 10 ? true : false
                }
              }
            }
          }
        }
      }
    },
    broken: {
      on: {
        REPAIR: "normal"
      }
    }
  }
});

```