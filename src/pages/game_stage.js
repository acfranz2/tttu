import React from 'react'
import SideBar from '../components/sidebar'
import L1Game from './l1Game';
import L2Game from './l2Game.js';
import Game from './game.js';
import Historybar from '../components/historybar';
import Grid from '@material-ui/core/Grid';
import { SystemUpdate } from '@material-ui/icons';

class GameStage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        moveList: [],
        currentMove: 0
    };    
  }

  insertMove = (lastMove, move) => {
    let newList = this.state.moveList;
    newList.push(lastMove);
    this.setState({
      moveList: newList,
      currentMove: move
    });
  }

  changeMove = (index) => {
    this.setState({
      currentMove: index
    });
  }

  getGame() {
    let type = this.props.location.state.type;
    if(type === 'Ultra')
      return <Game getLastMove={this.insertMove} currentMove={this.state.currentMove}/>;
    else if(type === 'Ultimate')
      return <L2Game getLastMove={this.insertMove} currentMove={this.state.currentMove}/>;
    else 
      return <L1Game getLastMove={this.insertMove} currentMove={this.state.currentMove}/>;
  }

  render() {
    return (
      <div>
        <SideBar />
        <Grid container direction="row" alignItems="stretch" justifyContent="center" spacing={4}>
          <Grid item >
            {this.getGame()}
          </Grid>
          <Grid item>
            <Historybar className="historybar" display="inline-block" board_hist={this.state.moveList} changeMove={this.changeMove} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default GameStage;