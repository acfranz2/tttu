import React from 'react'
import L3Board from './boards/l3Board'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreL1: Array(9).fill(null).map(() => Array(9).fill(null).map(() => Array(9).fill(null))),
      scoreL2: Array(9).fill(null).map(() => Array(9).fill(null)),
      scoreL3: Array(9).fill(null),
      player: true,
      playablel3: Array(9).fill(1),
      playablel2: Array(9).fill(null).map(() => Array(9).fill(1)),
      lastPlayedl3: -1,
      lastPlayedl2: -1,
      lastPlayedl1: -1
    };
  }

  handleClick(l1, l2, l3) {
    //console.log(this.state.playablel2 + ', ' + l1);
    //console.log(this.state.playablel3 + ', ' + l2);

    if (this.state.playablel3[l3] && this.state.playablel2[l3][l2] && !this.state.scoreL1[l3][l2][l1]) {
      const newScoreL1 = this.state.scoreL1;
      const newScoreL2 = this.state.scoreL2;
      const newScoreL3 = this.state.scoreL3;
      const newPlayableL2 = Array(9).fill(null).map(() => Array(9).fill(null));

      newScoreL1[l3][l2][l1] = this.state.player ? "X" : "O";

      //console.log(l3 + 1, l2 + 1, l1 + 1);
	 
      newScoreL2[l3][l2] = checkScore(newScoreL1[l3][l2]);
      newScoreL3[l3] = checkScore(newScoreL2[l3]);

      if(newScoreL3[l2]) {
	for(let i = 0; i < 9; i++) {
	  for(let j = 0; j < 9; j++) {
            if(!newScoreL2[i][j]) {
              newPlayableL2[i][j] = 1;
            }
          }
	}
      }
      else {
	if(newScoreL2[l2][l1]) {
          for(let i = 0; i < 9; i++) {
	    if(i !== l1 && !newScoreL2[l2][i]) {
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
        lastPlayedl1: l1
      });
    }
  }

  render() {
    return (
      <div className="game">
        <L3Board score={this.state.scoreL1} onClick={(l1, l2, l3) => this.handleClick(l1, l2, l3)}
          /*playablel3={this.state.playablel3}*/ playablel2={this.state.playablel2} player={this.state.player}
          lastPlayedl3={this.state.lastPlayedl3} lastPlayedl2={this.state.lastPlayedl2} lastPlayedl1={this.state.lastPlayedl1}/>
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
