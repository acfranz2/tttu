import React from 'react'
import L2Board from './boards/l2Board'

class L2Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreL1: Array(9).fill(null).map(() => Array(9).fill(null)),
      scoreL2: Array(9).fill(null),
      player: true,
      winner: null,
      nplayable: Array(9).fill(null),
      playablel1: Array(9).fill(1),	    
      lastPlayedl2: -1,
      lastPlayedl1: -1
    };
  }

  handleClick(l1, l2) {
    // console.log(this.state.playablel2 + ', ' + l1);
    // console.log(this.state.playablel3 + ', ' + l2);
    if (this.state.playablel1[l2] && !this.state.scoreL1[l2][l1]) {
      const newScoreL1 = this.state.scoreL1;
      const newScoreL2 = this.state.scoreL2;
      const newPlayableL1 = Array(9).fill(null);
      let newWinner = this.state.winner;

      newScoreL1[l2][l1] = this.state.player ? "X" : "O";

      //console.log(l3 + 1, l2 + 1, l1 + 1);
      newScoreL2[l2] = checkScore(newScoreL1[l2]);
      newWinner = checkScore(newScoreL2)

      if(newScoreL2[l1]) {
        for(let i = 0; i < 9; i++) {
          if(!newScoreL2[i]) {
            newPlayableL1[i] = 1;
	  }
        }
      }
      else {
        newPlayableL1[l1] = 1;
      }

      this.setState({
        scoreL1: newScoreL1,
        scoreL2: newScoreL2,
        player: !this.state.player,
	winner: newWinner,
        nplayable: this.state.nplayable,
        playablel1: newPlayableL1,
        lastPlayedl2: l2,
        lastPlayedl1: l1
      });
    }
  }

  handleHover(l1, l2) {
    if (this.state.playablel1[l2] && !this.state.scoreL1[l2][l1]) {
      const newNPlayable = Array(9).fill(null);

      if(this.state.scoreL2[l1]) {
        for(let i = 0; i < 9; i++) {
          if(!this.state.scoreL2[i]) {
            newNPlayable[i] = 1;
          }
        }
      }
      else {
        newNPlayable[l1] = 1;
      }

      this.setState({
        scoreL1: this.state.scoreL1,
        scoreL2: this.state.scoreL2,
        player: this.state.player,
        playablel2: this.state.playablel2,
        lastPlayedl2: this.state.lastPlayedl2,
        lastPlayedl1: this.state.lastPlayedl1,
        nplayable: newNPlayable
      });
    }
  }

  render() {
    return (
      <div className="game">
	<table className="l2table">
          <L2Board scoreL1={this.state.scoreL1} scoreL2={this.state.scoreL2} 
	    onClick={(l1, l2) => this.handleClick(l1, l2)}
	    onMouseEnter={(l1, l2) => this.handleHover(l1, l2)}
            playablel2={this.state.playablel1} player={this.state.player}
	    nplayable={this.state.nplayable}
            lastPlayedl2={this.state.lastPlayedl2} lastPlayedl1={this.state.lastPlayedl1}/>
        </table>
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

export default L2Game;
