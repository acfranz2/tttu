import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Game from './pages/game'
import Home from './pages/home'
import game_settings_page from './pages/game_settings';
import L2Game from './l2Game'
import game_stage from './pages/game_stage';


function App() {
  return (
    <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, left: 0, height: "100%", background: "linear-gradient(rgb(30, 186, 103),rgba(30, 160, 186, 0.75))" }}>
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/game' exact component={Game} />
          <Route path='/l2Game' exact component={L2Game} />
          <Route path='/game_settings' exact component={game_settings_page} />
          <Route path='/game_stage' exact component={game_stage} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
