import React from 'react';
import './App.css';
import IssueList from './components/IssueList'
import data from './db/issues'

function App() {
  return (
    <div class="container desktop-padding-px-100">
      <div class="row">
        <div className="col-10">
          <h1>Issues</h1>
        </div>
        <div className="col-2 right-align">
          <a class="btn btn-outline">+ Add</a>
        </div>
      </div>
      <p>
        <IssueList data={data}/>
      </p>
      
    </div>
  );
}

export default App;
