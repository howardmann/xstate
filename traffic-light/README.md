# XState Chart Traffic Lights

Demo link:
http://xstatetrafficlight.surge.sh/

XState Chart
![traffic-light](trafficlight.png)


```javascript
const TrafficLightMachine = Machine({
  id: 'TrafficLight',
  initial: "normal",
  states: {
    normal: {
      id: "4270a101",
      initial: "unlit",
      on: {
        BREAK: "broken",
        RESET: "normal.lit"
      },
      states: {
        unlit: {
          id: "2a412589",
          on: {
            TURN_ON: "lit"
          }
        },
        lit: {
          id: "89246514",
          initial: "green",
          on: {
            TURN_OFF: "unlit"
          },
          states: {
            green: {
              id: "1ecaaa9d",
              on: {
                TIMER: {
                  target: "yellow",
                  // Additional guard condition required
                  cond: (_context, event) => event.elapsed >= 3 ? true : false
                }
              }
            },
            yellow: {
              id: "e7da3afc",
              on: {
                TIMER: {
                  target: "red", 
                  cond: (_context, event) => event.elapsed >= 5 ? true : false
                }
              }
            },
            red: {
              id: "4d4c91d2",
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
      id: "87c05516",
      on: {
        REPAIR: "normal"
      }
    }
  }
});

```