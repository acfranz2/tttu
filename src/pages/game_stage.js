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
    console.log("GET LAST MOVE CALLED");
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
    if (type === 'Ultra')
      return <Game gamekey={this.props.location.state.gamekey} getLastMove={this.insertMove} currentMove={this.state.currentMove} players_online={this.props.location.state.players_online}
        player={this.props.location.state.player} myturn={this.props.location.state.myturn} />;
    else if (type === 'Ultimate')
      return <L2Game gamekey={this.props.location.state.gamekey} getLastMove={this.insertMove} currentMove={this.state.currentMove} players_online={this.props.location.state.players_online} />;
    else
      return <L1Game gamekey={this.props.location.state.gamekey} getLastMove={this.insertMove} currentMove={this.state.currentMove} players_online={this.props.location.state.players_online}
        player={this.props.location.state.player} myturn={this.props.location.state.myturn} />;
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