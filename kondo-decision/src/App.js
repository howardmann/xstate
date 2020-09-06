import React from 'react';
import './App.css';
import IssueList from './components/IssueList'
import data from './db/issues'

function App() {
  return (
    <div class="container desktop-padding-px-100">
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
        <IssueList data={data}/>
      </p>
      
    </div>
  );
}

export default App;
