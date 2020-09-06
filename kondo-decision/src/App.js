import React from 'react';
import './App.css';
import IssueList from './components/IssueList'


function App() {
  return (
    <div>
      <div>
        <h2 style={{float: 'left'}}>
          PROJECT KONDO
        </h2>
        <button 
          style={{float: 'right'}}
          onClick = {
            () => alert('⚒️ New Issue Form')
          }
        >
          + Add
        </button>
        <div style={{clear: 'both'}}></div>
      </div>
      <p>
        <IssueList/>
      </p>
      
    </div>
  );
}

export default App;
