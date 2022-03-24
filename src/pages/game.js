import React from 'react'
import L3Board from '../boards/l3Board'
import L2Board from '../boards/l2Board'
import '../boards/board.css';
import Historybar from '../components/historybar';
import Navbar from '../components/Navbar';
import Grid from '@material-ui/core/Grid';
import ResetButton from '../components/ResetButton';



class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        scoreL1: Array(9).fill(null).map(() => Array(9).fill(null).map(() => Array(9).fill(null))),
        scoreL2: Array(9).fill(null).map(() => Array(9).fill(null)),
        scoreL3: Array(9).fill(null),
        player: true,
        playablel2: Array(9).fill(null).map(() => Array(9).fill(1)),
        lastPlayedl3: -1,
        lastPlayedl2: -1,
        lastPlayedl1: -1,
        winner: null
      }],
      currl1: -1,
      currl2: -1,
      currl3: -1,
      nplayable: Array(9).fill(null).map(() => Array(9).fill(null)),
      move: 0
    };
  }

  handleClick(l1, l2, l3) {
    let gState = this.state.history[this.state.move];
    if (gState.playablel2[l3][l2] && !gState.scoreL1[l3][l2][l1] && !gState.winner) {
      if(!this.props.practice && this.state.move !== this.props.currentMove) {
        return;
      }
      const newScoreL1 = JSON.parse(JSON.stringify(gState.scoreL1));
      const newScoreL2 = JSON.parse(JSON.stringify(gState.scoreL2));
      const newScoreL3 = JSON.parse(JSON.stringify(gState.scoreL3));
      const newPlayableL2 = Array(9).fill(null).map(() => Array(9).fill(null));
      let newWinner = null;

      newScoreL1[l3][l2][l1] = gState.player ? "X" : "O";
      newScoreL2[l3][l2] = checkScore(newScoreL1[l3][l2]);
      newScoreL3[l3] = checkScore(newScoreL2[l3]);
      newWinner = checkScore(newScoreL3);

      if (newScoreL3[l2]) {
        for (let i = 0; i < 9; i++) {
          if (newScoreL3[i])
            continue;
          for (let j = 0; j < 9; j++) {
            if (!newScoreL2[i][j]) {
              newPlayableL2[i][j] = 1;
            }
          }
        }
      }
      else {
        if (newScoreL2[l2][l1]) {
          for (let i = 0; i < 9; i++) {
            if (i !== l1 && !newScoreL2[l2][i]) {
              newPlayableL2[l2][i] = 1;
            }
          }
        }
        else {
          newPlayableL2[l2][l1] = 1;
        }
      }

      if(this.state.move % 2 === 0) {
        this.props.getLastMove('-1', this.state.move + 1);
      }
      let str = l3 + " " + l2 + " " + l1;
      this.props.getLastMove(str, this.state.move + 1);

      let newState = {
        scoreL1: newScoreL1,
        scoreL2: newScoreL2,
        scoreL3: newScoreL3,
        player: !gState.player,
        playablel2: newPlayableL2,
        lastPlayedl3: l3,
        lastPlayedl2: l2,
        lastPlayedl1: l1,
        winner: newWinner
      }

      this.setState({
        history: this.state.history.concat([
          newState
        ]),
        nplayable: Array(9).fill(null).map(() => Array(9).fill(null)),
        currl3: -1,
        currl2: -1,
        currl1: -1,
        move: this.state.move + 1
      });
    }
  }

  handleHover(l1, l2, l3) {
    let gState = this.state.history[this.state.move];
    const newNPlayable = Array(9).fill(null).map(() => Array(9).fill(null));
    if (gState.playablel2[l3][l2] && !gState.scoreL1[l3][l2][l1] && !gState.winner) {
      if(!this.props.practice && this.state.move !== this.props.currentMove) {
        return;
      }
      const scoreL1 = JSON.parse(JSON.stringify(gState.scoreL1));
      const scoreL2 = JSON.parse(JSON.stringify(gState.scoreL2));
      const scoreL3 = JSON.parse(JSON.stringify(gState.scoreL3));
      
      scoreL1[l3][l2][l1] = gState.player ? "X" : "O";
      scoreL2[l3][l2] = checkScore(scoreL1[l3][l2]);
      scoreL3[l3] = checkScore(scoreL2[l3]);

      if (scoreL3[l2]) {
        for (let i = 0; i < 9; i++) {
          if (scoreL3[i])
            continue;
          for (let j = 0; j < 9; j++) {
            if (!scoreL2[i][j]) {
              newNPlayable[i][j] = 1;
            }
          }
        }
      }
      else {
        if (scoreL2[l2][l1]) {
          for (let i = 0; i < 9; i++) {
            if (i !== l1 && !scoreL2[l2][i]) {
              newNPlayable[l2][i] = 1;
            }
          }
        }
        else {
          newNPlayable[l2][l1] = 1;
        }
      }

      this.setState({
        nplayable: newNPlayable,
        currl3: l3,
        currl2: l2,
        currl1: l1
      });
    }
    else {
      this.setState({
        nplayable: newNPlayable,
        currl3: -1,
        currl2: -1,
        currl1: -1
      });
    }
  }

  reset() {
    this.setState({
      history: [{
        scoreL1: Array(9).fill(null).map(() => Array(9).fill(null).map(() => Array(9).fill(null))),
        scoreL2: Array(9).fill(null).map(() => Array(9).fill(null)),
        scoreL3: Array(9).fill(null),
        player: true,
        playablel2: Array(9).fill(null).map(() => Array(9).fill(1)),
        lastPlayedl3: -1,
        lastPlayedl2: -1,
        lastPlayedl1: -1,
        winner: null
      }],
      currl1: -1,
      currl2: -1,
      currl3: -1,
      nplayable: Array(9).fill(null).map(() => Array(9).fill(null)),
      move: 0
    });
  }

  renderReset() {
    if(this.props.practice) {
      return <ResetButton reset={() => {this.reset()}}></ResetButton>;
    }
  }

  render() {
    let gState = null;
    if(this.props.practice) {
      gState = this.state.history[this.state.move];
    }
    else {
      gState = this.state.history[this.props.currentMove];

      if(this.props.currentMove !== this.state.move) {
        this.state.nplayable = Array(9).fill(null).map(() => Array(9).fill(null));
        this.state.currl1 = -1;
        this.state.currl2 = -1;
        this.state.currl3 = -1;
      }
    }

    let className = 'game';
    if(!this.props.practice && this.state.move !== this.props.currentMove) {
      className += ' faded';
    }

    return (
      <div className={className}>
        <table className="l3table">
          <L3Board scoreL1={gState.scoreL1} scoreL2={gState.scoreL2} scoreL3={gState.scoreL3}
            onClick={(l1, l2, l3) => this.handleClick(l1, l2, l3)}
            onMouseEnter={(l1, l2, l3) => this.handleHover(l1, l2, l3)}
            playablel2={gState.playablel2} nplayable={this.state.nplayable} player={gState.player}
            lastPlayedl3={gState.lastPlayedl3} lastPlayedl2={gState.lastPlayedl2} lastPlayedl1={gState.lastPlayedl1}
            currl1={this.state.currl1} currl2={this.state.currl2} currl3={this.state.currl3}
            size={'l3'} histMode={this.props.currentMove !== this.state.move} />
        </table>
        {this.renderReset()}
      </div>
    );
  }

}

function checkScore(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let full = 0;

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a];
    if (board[a] && board[b] && board[c])
      full++;
  }

  if (full === 8)
    return "drawn";
  return null;
}

export default Game;
