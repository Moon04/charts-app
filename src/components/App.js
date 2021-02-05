import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import InternalDashboard from './InternalDashboard';
import NewChartForm from './NewChartForm';

class App extends Component {

  // componentDidMount () {
  //   const { dispatch, loading } = this.props
  //   if (loading === true) {
  //     dispatch(handleInitialData());
  //   }
  // }

  render(){
    return (
      <Router basename='/projects/redux-twitter'>
      <Fragment>
        {/* <LoadingBar /> */}
        <div className='app-container'>
          {this.props.loading === true? null
            : <div>
                <Route path='/' exact component={InternalDashboard} />
                <Route path='/add-chart' component={NewChartForm} />
              </div>}
        </div>
      </Fragment>
      </Router>
    );
  }
}

export default App;
