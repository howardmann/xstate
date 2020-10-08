import React from 'react';
import './App.css';
import IssuesBoard from './components/IssuesBoard'
import {listIssues} from './data-access/issues-db'
import {Helmet} from 'react-helmet'

const App = () => (
    <HomePage />
)



function HomePage() {

  const [data, setData] = React.useState({})

  const fetchIssues = () => {
    return listIssues()
      .then(data => {
        setData(data)
      })
  }

  React.useEffect(()=> {
    fetchIssues()
  }, [])

  return (
    <div>
      <Helmet>
        <title>Kondo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      <div className="px-10 desktop-px-50 laptop-px-50" style={{backgroundColor: '#F5F5F5'}}>
        <div className="container">
          <div className="row flex items-center">
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
                className="btn btn-outline">+ Add</a>
            </div>
          </div>
          {
            (data.length > 0) ? <IssuesBoard data={data}/> : <div>Loading...</div>
          }

        </div>      
      </div>
    </div>
  );
}

export default App;
