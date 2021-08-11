import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Game from './pages/game'
import Home from './pages/home'
import game_settings_page from './pages/game_settings';


function App() {
  return (
    <div>
      <Router>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/game' exact component={Game} />
            <Route path='/game_settings' exact component={game_settings_page} />
          </Switch>
      </Router>
    </div>
  )
}

export default App
