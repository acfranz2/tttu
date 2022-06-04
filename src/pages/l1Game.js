import React from 'react'
import L1Board from '../boards/l1Board'
import db from '../firebase.js';
import { where, doc, addDoc, setDoc, collection, query, updateDoc, onSnapshot, FieldPath } from "firebase/firestore";
import { validateCallback } from '@firebase/util';


class L1Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        score: Array(9).fill(null),
        winner: null,
        lastPlayed: -1,
      }],
      player: props.player,
      myturn: props.myturn,
      curr: -1,
      move: 0,
      players_online: props.players_online
    };
    console.log("Player: " + this.state.player);
  }

  unsub = onSnapshot(
    doc(db, "games", this.props.gamekey),
    { includeMetadataChanges: true },
    (doc) => {
      //console.log("DATABSE CHANGED");
      //console.log("Current data: ", doc.data());
      this.state.players_online = doc.data().players_online;
    });

  unsub = onSnapshot(query(collection(db, "games"), where('gamekey', '==', this.props.gamekey)), (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        //console.log("New additions: ", change.doc.data());
      }
      if (change.type === "modified") {
        //console.log("Modified value: ", change.doc.data())
        // for (let i = 0; i < 9; i++) {
        //}
        console.log("database update");
        if (this.state.player == change.doc.get("turn")) {
          this.handleOpponentsClick(change.doc.get("lastMove"));
        }
      }
      if (change.type === "removed") {
        //console.log("Removed value: ", change.doc.data());
      }
    });
  });

  handleClick(l1) {
    console.log("HANDLE CLICK CALLED");
    let gState = this.state.history[this.state.move];
    console.log(this.state.myturn);
    console.log(this.state.move);
    console.log(this.props.currentMove);
    console.log(!gState.score[l1]);
    console.log(!gState.winner);
    console.log(this.state.players_online);
    if (!gState.score[l1] && !gState.winner && this.state.move === this.props.currentMove
      && (this.state.players_online == 0 || this.state.players_online == 2) && this.state.myturn) {

      const newScore = JSON.parse(JSON.stringify(gState.score));
      let newWinner = this.state.winner;

      newScore[l1] = this.state.player == 1 ? "X" : "O";

      newWinner = checkScore(newScore);

      const gameDoc = doc(db, 'games', this.props.gamekey);
      updateDoc(gameDoc, {
        [l1]: this.state.player == 1 ? "X" : "O",
        "turn": this.state.player == 1 ? 2 : 1,
        "lastMove": l1
      });

      if (this.state.move % 2 === 0) {
        this.props.getLastMove('-1', this.state.move + 1);
      }
      let str = l1 + "";
      this.props.getLastMove(str, this.state.move + 1);

      let newState = {
        score: newScore,
        winner: newWinner,
        lastPlayed: l1,
        myturn: false
      }

      this.setState({
        history: this.state.history.concat([
          newState
        ]),
        curr: -1,
        move: this.state.move + 1
      });
      this.state.myturn = false;
      console.log("CLICK has finished");

    }
  }



  handleOpponentsClick(l1) {
    console.log(l1);
    let gState = this.state.history[this.state.move];

    if (!gState.score[l1] && !gState.winner && this.state.move === this.props.currentMove
      && (this.state.players_online == 0 || this.state.players_online == 2)) {

      const newScore = JSON.parse(JSON.stringify(gState.score));
      let newWinner = this.state.winner;

      newScore[l1] = this.state.player == 1 ? "O" : "X";

      newWinner = checkScore(newScore);

      this.props.getLastMove('-1', this.state.move + 0);

      let str = l1 + "";
      this.props.getLastMove(str, this.state.move + 0);

      let newState = {
        score: newScore,
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

      this.state.myturn = true;
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

    let className = 'l1game';
    if (!this.props.practice && this.state.move !== this.props.currentMove) {
      className += ' faded';
    }

    console.log(this.state.history);
    console.log(this.props.currentMove);

    return (
      <div className={className}>
        <table className="l1table">
          <L1Board scoreL1={gState.score}
            onClick={(l1) => this.handleClick(l1)}
            onMouseEnter={(l1) => this.handleHover(l1)}
            player={this.state.player}
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