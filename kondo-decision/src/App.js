import React from 'react';
import './App.css';
import IssueList from './components/IssueList'
import data from './db/issues'

function App() {
  return (
    <div class="px-10 desktop-px-50 laptop-px-50" style={{backgroundColor: '#F5F5F5'}}>
      <div className="container">
        <div class="row flex items-center">
          <div className="col-4">
            <img height="20" src="https://cim.io/wp-content/uploads/2019/10/CIM_Logo_RGB.svg" alt=""/>
          </div>
          <div className="col-4 center">
            <h2>
              Issues
            </h2>
          </div>
          <div className="col-4 right-align">
            <a
              onClick={() => alert('Add Issue Form (TBC)')} 
              class="btn btn-outline">+ Add</a>
          </div>
        </div>
        <p>
          <IssueList data={data}/>
        </p>
      </div>      
    </div>
  );
}

export default App;
