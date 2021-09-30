import React from 'react'
import './index.css'
import SearchBar from './components/SearchBar'
import Hourly from './components/Hourly';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";



class App extends React.Component {




  render() {

    return (
      <Router>



        <Switch>
          <Route exact path="/">
            <SearchBar />
          </Route>
          <Route path="/:city/:id" component={Hourly} />
        </Switch>



      </Router>
    )
  }



}

export default App;
