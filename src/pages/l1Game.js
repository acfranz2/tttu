import React from 'react'
import L1Board from '../boards/l1Board'

class L1Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        score: Array(9).fill(null),
        winner: null,
        player: true,
        lastPlayed: -1
      }],
      curr: -1,
      move: 0
    };
  }

  handleClick(l1) {
    let gState = this.state.history[this.state.move];
    if (!gState.score[l1] && !gState.winner && this.state.move === this.props.currentMove) {
      const newScore = JSON.parse(JSON.stringify(gState.score));;
      let newWinner = this.state.winner;

      newScore[l1] = gState.player ? "X" : "O";

      newWinner = checkScore(newScore);

      if(this.state.move % 2 === 0) {
        this.props.getLastMove('-1', this.state.move + 1);
      }
      let str = l1 + "";
      this.props.getLastMove(str, this.state.move + 1);

      let newState = {
        score: newScore,
        player: !gState.player,
        winner: newWinner,
        lastPlayed: l1
      }
      this.setState({
        history: this.state.history.concat([
          newState
        ]),
        curr: -1,
        move: this.state.move + 1
      });
    }
  }

  handleHover(l1) {
    let gState = this.state.history[this.state.move];
    if (!gState.score[l1] && !gState.winner && this.state.move === this.props.currentMove) {
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
    let gState = this.state.history[this.props.currentMove];
    return (
      <div className="l1game">
        <table className="l1table">
          <L1Board scoreL1={gState.score}
            onClick={(l1) => this.handleClick(l1)}
            onMouseEnter={(l1) => this.handleHover(l1)}
            player={gState.player}
            lastPlayedl1={gState.lastPlayed}
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