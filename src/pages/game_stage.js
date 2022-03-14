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
    let newList = this.state.moveList;
    newList.push(lastMove);
    this.setState({
      moveList: newList
    });
    console.log(this.state.moveList);
  }

  render() {
    return (
      <div>
        <SideBar />
        <Grid container direction="row" alignItems="stretch" justifyContent="space-between" spacing={3}>
          <Grid item >
            <Game getLastMove={this.insertMove} onClick={() => console.log('clicked')} />
          </Grid>
          <Grid item>
            <Historybar className="historybar" board_hist={this.state.moveList}  />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default GameStage;