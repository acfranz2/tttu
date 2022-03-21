import React from 'react'
import L1Board from '../boards/l1Board'

class L1Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: Array(9).fill(null),
      player: true,
      winner: null,
      lastPlayed: -1,
      curr: -1
    };
  }

  handleClick(l1) {
    if (!this.state.score[l1] && !this.state.winner) {
      const newScore = this.state.score;
      let newWinner = this.state.winner;

      newScore[l1] = this.state.player ? "X" : "O";

      newWinner = checkScore(newScore)

      let str = l1 + "";
      this.props.getLastMove(str);

      this.setState({
        score: newScore,
        player: !this.state.player,
        winner: newWinner,
        lastPlayed: l1,
        curr: -1
      });
    }
  }

  handleHover(l1) {
    const newNPlayable = Array(9).fill(null);
    if (!this.state.score[l1] && !this.state.winner) {
      this.setState({
        curr: l1
      });
    }
    else {
      this.setState({
        curr: -1
      });
    }
  }

  render() {
    return (
      <div className="l1game">
        <table className="l1table">
          <L1Board scoreL1={this.state.score}
            onClick={(l1) => this.handleClick(l1)}
            onMouseEnter={(l1) => this.handleHover(l1)}
            player={this.state.player}
            lastPlayedl1={this.state.lastPlayed}
            currl1={this.state.curr}
            size={'l1'} />
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

export default L1Game;