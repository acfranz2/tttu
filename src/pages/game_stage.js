import { Grid, Paper } from '@material-ui/core'
import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import PersistentDrawerLeft from '../components/sidebar'

import L2Game from '../l2Game.js'
import Game from './game.js'

class game_stage extends React.Component {
  render() {
    console.log(this.props.location.state);
    if (this.props.location.state) {
      if (this.props.location.state['type'] == "Ultimate") {
        return (
          <div>
            <PersistentDrawerLeft />
            <L2Game />
          </div>
        );
      }
    }
    return (
      <div>
        <PersistentDrawerLeft />
        <Game />
      </div>
    );
  }
}

export default game_stage;
