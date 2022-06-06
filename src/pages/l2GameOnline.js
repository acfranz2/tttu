import React from 'react'
import L2Board from '../boards/l2Board'
import ResetButton from '../components/ResetButton';
import '../boards/board.css';
import db from '../firebase.js';
import { where, doc, addDoc, setDoc, collection, query, updateDoc, onSnapshot, FieldPath } from "firebase/firestore";
import { validateCallback } from '@firebase/util';

class L2GameOnline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scoreL1: Array(9).fill(null).map(() => Array(9).fill(null)),
            scoreL2: Array(9).fill(null),
            player: props.player,
            winner: null,
            playablel1: Array(9).fill(1),
            lastPlayedl2: -1,
            lastPlayedl1: -1,
            currl1: -1,
            currl2: -1,
            nplayable: Array(9).fill(null),
            players_online: props.players_online,
            opponentLastPlayed: true,
            myturn: props.myturn
        };
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
            console.log("DATABSE CHANGED");

            if (change.type === "modified") {
                console.log("Player: " + this.state.player);
                console.log("Turn:" + change.doc.get("turn"));

                if (this.state.player == change.doc.get("turn")) {
                    const docLastMove = change.doc.get("lastMove");
                    //console.log("DATABSE CHANGED");
                    this.state.myturn = change.doc.get("turn") == this.state.player;
                    let l1FromDatabase = 0;
                    if (docLastMove == 8) {
                        l1FromDatabase = 8;
                    }
                    else {
                        l1FromDatabase = docLastMove % 8;
                    }
                    const l2FromDatabase = (docLastMove - l1FromDatabase) / 8;

                    this.handleClick(l1FromDatabase, l2FromDatabase, false);
                }
            }




            if (change.type === "added") {
                //console.log("New additions: ", change.doc.data());
            }
            if (change.type === "modified") {

                // console.log(this.state.player);
                // console.log(change.doc.get("turn"));
            }
            if (change.type === "removed") {
                //console.log("Removed value: ", change.doc.data());
            }


        });
    });


    handleClick(l1, l2, myMove) {
        console.log(this.state.myturn);
        if (this.state.playablel1[l2] && !this.state.scoreL1[l2][l1] && !this.state.winner
            && (this.state.players_online == 0 || this.state.players_online == 2) && (this.state.myturn || myMove == false)) {

            const newScoreL1 = JSON.parse(JSON.stringify(this.state.scoreL1));
            const newScoreL2 = JSON.parse(JSON.stringify(this.state.scoreL2));
            const newPlayableL1 = Array(9).fill(null);
            let newWinner = null;

            //newScoreL1[l2][l1] = this.state.player ? "X" : "O";
            if (myMove) { newScoreL1[l2][l1] = this.state.player == 1 ? "X" : "O"; }
            else { newScoreL1[l2][l1] = this.state.player == 1 ? "O" : "X"; }


            newScoreL2[l2] = checkScore(newScoreL1[l2]);
            newWinner = checkScore(newScoreL2)

            if (newScoreL2[l1]) {
                for (let i = 0; i < 9; i++) {
                    if (!newScoreL2[i]) {
                        newPlayableL1[i] = 1;
                    }
                }
            }
            else {
                newPlayableL1[l1] = 1;
            }

            const gameDoc = doc(db, 'games', this.props.gamekey);

            const key = l2 * 8 + l1;

            if (myMove) {
                updateDoc(gameDoc, {
                    [key]: this.state.player == 1 ? "X" : "O",
                    "turn": this.state.player == 1 ? 2 : 1,
                    "lastMove": key
                });
                this.setState({
                    scoreL1: newScoreL1,
                    scoreL2: newScoreL2,
                    winner: newWinner,
                    playablel1: newPlayableL1,
                    lastPlayedl2: l2,
                    lastPlayedl1: l1,
                    currl2: -1,
                    currl1: -1,
                    nplayable: Array(9).fill(null),
                    opponentLastPlayed: false,
                    myturn: false
                });
            }
            else {
                this.setState({
                    scoreL1: newScoreL1,
                    scoreL2: newScoreL2,
                    winner: newWinner,
                    playablel1: newPlayableL1,
                    lastPlayedl2: l2,
                    lastPlayedl1: l1,
                    currl2: -1,
                    currl1: -1,
                    nplayable: Array(9).fill(null),
                    opponentLastPlayed: true,
                    myturn: true
                });
            }
        }
    }

    handleHover(l1, l2) {
        let gState = this.state;
        const newNPlayable = Array(9).fill(null);

        if (this.state.playablel1[l2] && !this.state.scoreL1[l2][l1] && !this.state.winner) {
            const scoreL1 = JSON.parse(JSON.stringify(this.state.scoreL1));
            const scoreL2 = JSON.parse(JSON.stringify(this.state.scoreL2));
            scoreL1[l2][l1] = this.state.player ? "X" : "O";
            scoreL2[l2] = checkScore(scoreL1[l2]);

            if (scoreL2[l1]) {
                for (let i = 0; i < 9; i++) {
                    if (!scoreL2[i]) {
                        newNPlayable[i] = 1;
                    }
                }
            }
            else {
                newNPlayable[l1] = 1;
            }

            this.setState({
                nplayable: newNPlayable,
                currl2: l2,
                currl1: l1
            });
        }
        else {
            this.setState({
                nplayable: newNPlayable,
                currl2: -1,
                currl1: -1
            });
        }
    }

    reset() {
        this.setState({
            scoreL1: Array(9).fill(null).map(() => Array(9).fill(null)),
            scoreL2: Array(9).fill(null),
            player: true,
            winner: null,
            playablel1: Array(9).fill(1),
            lastPlayedl2: -1,
            lastPlayedl1: -1,
            currl1: -1,
            currl2: -1,
            nplayable: Array(9).fill(null),
            move: 0
        });
    }

    renderReset() {
        if (this.props.practice) {
            return <ResetButton reset={() => { this.reset() }}></ResetButton>;
        }
    }

    render() {

        let className = 'l2game';
        // if (!this.props.practice) {
        //   className += ' faded';
        // }

        return (
            <div className={className}>
                <table className="l2table">
                    <L2Board scoreL1={this.state.scoreL1} scoreL2={this.state.scoreL2}
                        onClick={(l1, l2) => this.handleClick(l1, l2, true)}
                        onMouseEnter={(l1, l2) => this.handleHover(l1, l2)}
                        playablel2={this.state.playablel1} player={this.state.player}
                        nplayable={this.state.nplayable}
                        lastPlayedl2={this.state.lastPlayedl2} lastPlayedl1={this.state.lastPlayedl1}
                        currl1={this.state.currl1} currl2={this.state.currl2}
                        size={this.props.practice ? 'l3' : 'l2'}
                        opponentLastPlayed={this.state.opponentLastPlayed} />
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

export default L2GameOnline;