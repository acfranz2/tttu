import React from 'react'
import SideBar from '../components/sidebar'
import L2Game from './l2Game.js'
import Game from './game.js'
import Historybar from '../components/historybar';
import Grid from '@material-ui/core/Grid';

class GameStage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        moveList: [],
        type: null
    };    
  }

  insertMove = (lastMove) => {
    let newList = this.state.moveList;
    newList.push(lastMove);
    this.setState({
      moveList: newList
    });
  }

  getGame() {
    let type = this.props.location.state.type;
    if(type === 'Ultra')
      return <Game getLastMove={this.insertMove} />
    else if(type === 'Ultimate')
      return <L2Game getLastMove={this.insertMove} />
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
            <Historybar className="historybar" display="inline-block" board_hist={this.state.moveList}  />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default GameStage;