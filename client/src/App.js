import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HeaderBar from './components/HeaderBar';
import Home from './components/Home';
import Result from './components/Result';
import Select from './components/Select';

function App() {
  return (
    <Router>
      <HeaderBar />
      <main>
        {/* <div className="App"> */}
          <Route path='/' component={Home} exact />
          <Route path='/Result' component={Result} />
          <Route path='/Select' component={Select} />
        {/* </div> */}
      </main>
    </Router>
  );
}

export default App;
