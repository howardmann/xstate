import React from 'react';

const Success = (props) => (
  <div>
    <h3>Success</h3>
    <button onClick={() => props.handleRetry()}>
      Retry
    </button>
  </div>
)

export {Success}