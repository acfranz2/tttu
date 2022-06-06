import React from 'react'
import SideBar from '../components/sidebar'
import L1Game from './l1Game';
import L2Game from './l2Game';
import L3Game from './l3Game';
import Historybar from '../components/historybar';
import Grid from '@material-ui/core/Grid';
import { SystemUpdate } from '@material-ui/icons';
import L1GameOnline from './l1GameOnline';
import L2GameOnline from './l2GameOnline';
import L3GameOnline from './l3GameOnline';

class GameStage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      moveList: [],
      currentMove: 0
    };
  }

  // insertMove = (lastMove, move) => {
  //   let newList = this.state.moveList;
  //   newList.push(lastMove);
  //   this.setState({
  //     moveList: newList,
  //     currentMove: move
  //   });
  // }

  changeMove = (index) => {
    this.setState({
      currentMove: index
    });
  }

  //getLastMove={this.insertMove} currentMove={this.state.currentMove} 

  getGame() {
    let type = this.props.location.state.type;
    let mode = this.props.location.state.mode;
    if (type === 'Ultra')
      if (mode == "online")
        return <L3GameOnline gamekey={this.props.location.state.gamekey} currentMove={this.state.currentMove}
          players_online={this.props.location.state.players_online} player={this.props.location.state.player} myturn={this.props.location.state.myturn} />;
      else
        return <L3Game currentMove={this.state.currentMove} player={this.props.location.state.player} myturn={this.props.location.state.myturn} />;
    else if (type === 'Ultimate')
      if (mode == "online")
        return <L2GameOnline gamekey={this.props.location.state.gamekey} currentMove={this.state.currentMove}
          players_online={this.props.location.state.players_online} player={this.props.location.state.player} myturn={this.props.location.state.myturn} />;
      else
        return <L2Game currentMove={this.state.currentMove} player={this.props.location.state.player} myturn={this.props.location.state.myturn} />;
    else
      if (mode == "online")
        return <L1GameOnline gamekey={this.props.location.state.gamekey} currentMove={this.state.currentMove}
          players_online={this.props.location.state.players_online} player={this.props.location.state.player} myturn={this.props.location.state.myturn} />;
      else
        return <L1Game currentMove={this.state.currentMove} player={this.props.location.state.player} myturn={this.props.location.state.myturn} />;
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
            {/* <Historybar className="historybar" display="inline-block" board_hist={this.state.moveList} changeMove={this.changeMove} /> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default GameStage;