import React from 'react'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Game from './pages/game'
import Home from './pages/home'


function App() {
  return (
    <div>
      <Router>
        <Navbar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/game' exact component={Game} />
          </Switch>
      </Router>
    </div>
  )
}

export default App
