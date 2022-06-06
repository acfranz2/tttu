import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home'
import Game_Settings from './pages/game_settings';
import GameStage from './pages/game_stage';
import Instructions from './pages/instructions';
import OnlineSetup from './pages/online_setup';

function App() {
  return (
    <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, left: 0, height: "100%", background: "linear-gradient(rgb(30, 186, 103),rgba(30, 160, 186, 0.75))" }}>
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/instructions' exact component={Instructions} />
          <Route path='/game_settings' exact component={Game_Settings} />
          <Route path='/game_stage/' exact component={GameStage} />
          <Route path='/game_stage/:id' exact component={GameStage} />
          <Route path='/online_game_setup' exact component={OnlineSetup} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
