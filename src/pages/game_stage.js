import React from 'react'
import SideBar from '../components/sidebar'
import L2Game from '../l2Game.js'
import Game from './game.js'
import Historybar from '../components/historybar';
import Grid from '@material-ui/core/Grid';

class GameStage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        moveList: []
    };    
  }

  insertMove = (lastMove) => {
    this.state.moveList.push(lastMove);
    console.log(this.state.moveList);
  }

  render() {
    return (
      <div>
        <SideBar />
        <Grid container direction="row" alignItems="stretch" justifyContent="space-between" spacing={3}>
          <Grid item >
            <Game getLastMove={this.insertMove} />
          </Grid>
          <Grid item>
            <Historybar className="historybar" board_hist={this.state.moveList} /*player={this.state.player}*/ />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default GameStage;