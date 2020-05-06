import {Machine, assign} from 'xstate'

const feedbackMachine = Machine({
  initial: 'rating',
  context: {
    rating: null,
    category: null,
    comment: null,
    contact: null
  },
  states: {
    rating: {
      id: 'rating',
      initial: 'new',
      on: {
        CLOSE: 'closed'
      },
      states: {
        new: {
          on: {
            POSITIVE: {
              target: 'feedback',
              actions: assign({
                rating: 'positive'
              })
            },
            NEUTRAL: {
              target: 'feedback',
              actions: assign({
                rating: 'neutral'
              })
            },
            NEGATIVE: {
              target: 'escalate',
              actions: assign({
                rating: 'negative'
              })
            }
          }
        },
        feedback: {
          initial: 'response',
          entry: assign({category: null}),
          on: {
            POSITIVE: {
              target: '#rating.feedback',
              actions: assign({
                rating: 'positive'
              })
            },
            NEUTRAL: {
              target: '#rating.feedback',
              actions: assign({
                rating: 'neutral'
              })
            },
            NEGATIVE: {
              target: '#rating.escalate',
              actions: assign({
                rating: 'negative'
              })
            }
          },
          states: {
            response: {
              on: {
                SUBMIT: '#rating.success',
                SELECT_CATEGORY: {
                  actions: assign({
                    category: (_ctx, evt) => evt.category
                  })
                },
                OTHER: 'comment'
              }
            },
            comment: {
              on: {
                SUBMIT: {
                  target: '#rating.success'
                },
                UPDATE_COMMENT: {
                  target: 'comment',
                  actions: assign({
                    comment: (_ctx, evt) => evt.comment
                  })
                }
              }
            }
          }
        },
        escalate: {
          initial: 'response',
          on: {
            POSITIVE: {
              target: '#rating.feedback',
              actions: assign({
                rating: 'positive'
              })
            },
            NEUTRAL: {
              target: '#rating.feedback',
              actions: assign({
                rating: 'neutral'
              })
            },
            NEGATIVE: {
              target: '#rating.escalate',
              actions: assign({
                rating: 'negative'
              })
            }
          },
          states: {
            response: {
              on: {
                NO: '#rating.success',
                YES: 'contact'
              }
            },
            contact: {
              on: {
                SUBMIT: {
                  target: '#rating.success'
                },
                UPDATE_CONTACT: {
                  target: 'contact',
                  actions: assign({
                    contact: (_ctx, evt) => evt.contact
                  })
                }
              }
            }
          }
        },
        success: {
          type: 'final'
        }
      }
    },
    closed: {
      type: 'final'
    }
  }
});

export default feedbackMachine