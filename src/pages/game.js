import React from 'react'
import L3Board from '../boards/l3Board'
import L2Board from '../boards/l2Board'
import Historybar from '../components/historybar';
import Navbar from '../components/Navbar';
import Grid from '@material-ui/core/Grid';




class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: true,
      playablel2: Array(9).fill(null).map(() => Array(9).fill(1)),
      nplayable: Array(9).fill(null).map(() => Array(9).fill(null)),
      board_hist: [{
        scoreL1: Array(9).fill(null).map(() => Array(9).fill(null).map(() => Array(9).fill(null))),
        scoreL2: Array(9).fill(null).map(() => Array(9).fill(null)),
        scoreL3: Array(9).fill(null),  
        lastPlayedl3: -1,
        lastPlayedl2: -1,
        lastPlayedl1: -1,
        move: ""
      }],
      stepNumber: 0, // step being looked at
      currentStepNumber: 0, // step last played
    };
  }

  handleClick(l1, l2, l3) {
    const history = this.state.board_hist;
    const newScoreL1 = history[this.state.stepNumber].scoreL1;
    if (this.state.stepNumber === this.state.currentStepNumber && this.state.playablel2[l3][l2] && !newScoreL1[l3][l2][l1]) {
      const newScoreL2 = history[this.state.stepNumber].scoreL2;
      const newScoreL3 = history[this.state.stepNumber].scoreL3;
      const newPlayableL2 = Array(9).fill(null).map(() => Array(9).fill(null));
      const newStepNumber = this.state.stepNumber + 1;

      newScoreL1[l3][l2][l1] = this.state.player ? "X" : "O";
      newScoreL2[l3][l2] = checkScore(newScoreL1[l3][l2]);
      newScoreL3[l3] = checkScore(newScoreL2[l3]);

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

      this.setState({
        scoreL1: newScoreL1,
        scoreL2: newScoreL2,
        scoreL3: newScoreL3,
        player: !this.state.player,
        playablel2: newPlayableL2,
        lastPlayedl3: l3,
        lastPlayedl2: l2,
        lastPlayedl1: l1,
        board_hist: history.concat([{
          scoreL1: newScoreL1,
          scoreL2: newScoreL2,
          scoreL3: newScoreL3,
          lastPlayedl3: l3,
          lastPlayedl2: l2,
          lastPlayedl1: l1,
          move: '(' + (l3 + 1) + ', ' + (l2 + 1) + ', ' + (l1 + 1) + ')',
        }]),
        stepNumber: newStepNumber,
        currentStepNumber: newStepNumber,
      });

    }

  }

  handleHover(l1, l2, l3) {
    const currBoard = this.state.board_hist[this.state.stepNumber];

    if (this.state.playablel2[l3][l2] && !currBoard.scoreL1[l3][l2][l1]) {
      const newNPlayable = Array(9).fill(null).map(() => Array(9).fill(null));

      if (currBoard.scoreL3[l2]) {
        for (let i = 0; i < 9; i++) {
          if (currBoard.scoreL3[i])
            continue;
          for (let j = 0; j < 9; j++) {
            if (!currBoard.scoreL2[i][j]) {
              newNPlayable[i][j] = 1;
            }
          }
        }
      }
      else {
        if (currBoard.scoreL2[l2][l1]) {
          for (let i = 0; i < 9; i++) {
            if (i !== l1 && !currBoard.scoreL2[l2][i]) {
              newNPlayable[l2][i] = 1;
            }
          }
        }
        else {
          newNPlayable[l2][l1] = 1;
        }
      }

      this.setState({
        nplayable: newNPlayable
      });
    }
  }

  render() {
    const currBoard = this.state.board_hist[this.state.stepNumber];
    const hist = this.state.board_hist.map((move) => {return move.move});
    return (
      <div className="game">
        <Grid container direction="row" alignItems="stretch" justifyContent="space-between" spacing={3}>
          <Grid item >
            <table className="l3table">
              <L3Board scoreL1={currBoard.scoreL1} scoreL2={currBoard.scoreL2} scoreL3={currBoard.scoreL3} onClick={(l1, l2, l3) => this.handleClick(l1, l2, l3)}
                onMouseEnter={(l1, l2, l3) => this.handleHover(l1, l2, l3)}
                /*playablel3={this.state.playablel3}*/ playablel2={this.state.playablel2} nplayable={this.state.nplayable} player={this.state.player}
                lastPlayedl3={currBoard.lastPlayedl3} lastPlayedl2={currBoard.lastPlayedl2} lastPlayedl1={currBoard.lastPlayedl1}/>
            </table>
	  </Grid>
          <Grid item >
            <Historybar className="historybar" board_hist={hist} player={this.state.player}/>
          </Grid>
        </Grid>
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
