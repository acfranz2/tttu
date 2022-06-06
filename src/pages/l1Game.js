import React from 'react'
import L1Board from '../boards/l1Board'


class L1Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameBoard: Array(9).fill(null),
      winner: null,
      lastPlayed: -1,
      player: props.player,
      curr: -1,
      opponentLastPlayed: true
    };
  }

  handleClick(l1) {
    console.log("handleClick")
    if (!this.state.gameBoard[l1] && !this.state.winner) {
      console.log("if statement passed")
      const newGameBoard = JSON.parse(JSON.stringify(this.state.gameBoard));
      let newWinner = this.state.winner;
      newGameBoard[l1] = this.state.player == 1 ? "X" : "O";

      newWinner = checkScore(newGameBoard);

      this.setState({
        gameBoard: newGameBoard,
        winner: newWinner,
        lastPlayed: l1,
        curr: -1,
        player: this.state.player == 1 ? 2 : 1,
        opponentLastPlayed: true
      });

    }
  }


  handleHover(l1) {
    if (!this.state.gameBoard[l1] && !this.state.winner) {
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

    let className = 'l1game';
    // if (!this.props.practice) {
    //   className += ' faded';
    // }

    return (
      <div className={className}>
        <table className="l1table">
          <L1Board scoreL1={this.state.gameBoard}
            onClick={(l1) => this.handleClick(l1, true)}
            onMouseEnter={(l1) => this.handleHover(l1)}
            player={this.state.player}
            lastPlayedl1={this.state.lastPlayed}
            currl1={this.state.curr}
            size={'l1'}
            opponentLastPlayed={this.state.opponentLastPlayed} />
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