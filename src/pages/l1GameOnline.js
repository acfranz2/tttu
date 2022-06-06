import React from 'react'
import L1Board from '../boards/l1Board'
import db from '../firebase.js';
import { where, doc, addDoc, setDoc, collection, query, updateDoc, onSnapshot, FieldPath } from "firebase/firestore";
import { validateCallback } from '@firebase/util';


class L1GameOnline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameBoard: Array(9).fill(null),
      winner: null,
      lastPlayed: -1,
      player: props.player,
      myturn: props.myturn,
      curr: -1,
      players_online: props.players_online,
      opponentLastPlayed: true
    };
    this.gameMode = props.gameMode;
    console.log("Player: " + this.state.player);
  }

  playerJoined = onSnapshot(
    doc(db, "games", this.props.gamekey),
    { includeMetadataChanges: true },
    (doc) => {
      //
      //console.log("Current data: ", doc.data());
      this.state.players_online = doc.data().players_online;
    });

  moveMade = onSnapshot(query(collection(db, "games"), where('gamekey', '==', this.props.gamekey)), (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        //console.log("New additions: ", change.doc.data());
      }
      if (change.type === "modified") {
        //console.log("Modified value: ", change.doc.data())
        // for (let i = 0; i < 9; i++) {
        //}
        console.log(this.state.player);
        console.log(change.doc.get("turn"));
        if (this.state.player == change.doc.get("turn")) {
          console.log("DATABSE CHANGED");
          this.state.myturn = true;
          console.log(this.state.myturn);
          this.handleClick(change.doc.get("lastMove"), false);
        }
      }
      if (change.type === "removed") {
        //console.log("Removed value: ", change.doc.data());
      }
    });
  });

  handleClick(l1, myMove) {
    console.log("handleClick")
    console.log(this.state.myturn);
    if (!this.state.gameBoard[l1] && !this.state.winner && (this.state.players_online == 0 || this.state.players_online == 2) && this.state.myturn) {
      console.log("if statement passed")
      const newGameBoard = JSON.parse(JSON.stringify(this.state.gameBoard));
      let newWinner = this.state.winner;
      console.log(myMove);
      if (myMove) { newGameBoard[l1] = this.state.player == 1 ? "X" : "O"; }
      else { newGameBoard[l1] = this.state.player == 1 ? "O" : "X"; }

      newWinner = checkScore(newGameBoard);

      const gameDoc = doc(db, 'games', this.props.gamekey);

      if (myMove) {
        updateDoc(gameDoc, {
          [l1]: this.state.player == 1 ? "X" : "O",
          "turn": this.state.player == 1 ? 2 : 1,
          "lastMove": l1
        });

        this.setState({
          gameBoard: newGameBoard,
          winner: newWinner,
          lastPlayed: l1,
          curr: -1,
          myturn: false,
          opponentLastPlayed: false
        });
      }
      else {
        this.setState({
          gameBoard: newGameBoard,
          winner: newWinner,
          lastPlayed: l1,
          curr: -1,
          myturn: true,
          opponentLastPlayed: true
        });
      }


    }
  }


  handleHover(l1) {
    if (this.state.myturn) {
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
            opponentLastPlayed={this.state.opponentLastPlayed}/>
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

export default L1GameOnline;