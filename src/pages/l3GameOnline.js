import React from 'react'
import L3Board from '../boards/l3Board'
import '../boards/board.css';
import ResetButton from '../components/ResetButton';
import db from '../firebase.js';
import { where, doc, addDoc, setDoc, collection, query, updateDoc, onSnapshot, FieldPath } from "firebase/firestore";
import { validateCallback } from '@firebase/util';


class L3GameOnline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scoreL1: Array(9).fill(null).map(() => Array(9).fill(null).map(() => Array(9).fill(null))),
            scoreL2: Array(9).fill(null).map(() => Array(9).fill(null)),
            scoreL3: Array(9).fill(null),
            player: props.player,
            playablel2: Array(9).fill(null).map(() => Array(9).fill(1)),
            lastPlayedl3: -1,
            lastPlayedl2: -1,
            lastPlayedl1: -1,
            winner: null,
            currl1: -1,
            currl2: -1,
            currl3: -1,
            nplayable: Array(9).fill(null).map(() => Array(9).fill(null)),
            players_online: props.players_online,
            opponentLastPlayed: true,
            myturn: props.myturn
        };
        console.log(props);
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
                    this.state.myturn = change.doc.get("turn") == this.state.player;

                    this.handleClick(change.doc.get("lastl3"), change.doc.get("lastl2"), change.doc.get("lastl1"), false);
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



    handleClick(l1, l2, l3, myMove) {
        console.log("handleclicked called");
        console.log(this.state.playablel2[l3][l2]);
        console.log(!this.state.scoreL1[l3][l2][l1]);
        console.log(!this.state.winner);

        console.log(this.state.myturn);
        console.log(myMove == false);
        if (this.state.playablel2[l3][l2] && !this.state.scoreL1[l3][l2][l1] && !this.state.winner
            && (this.state.players_online == 0 || this.state.players_online == 2) && (this.state.myturn || myMove == false)) {
            console.log("if statement passed");
            const newScoreL1 = JSON.parse(JSON.stringify(this.state.scoreL1));
            const newScoreL2 = JSON.parse(JSON.stringify(this.state.scoreL2));
            const newScoreL3 = JSON.parse(JSON.stringify(this.state.scoreL3));
            const newPlayableL2 = Array(9).fill(null).map(() => Array(9).fill(null));
            let newWinner = null;


            if (myMove) { newScoreL1[l3][l2][l1] = this.state.player ? "X" : "O"; }
            else { newScoreL1[l3][l2][l1] = this.state.player ? "O" : "X"; }

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

            const key = l3 * 81 + l2 * 8 + l1;
            const gameDoc = doc(db, 'games', this.props.gamekey);

            if (myMove) {
                updateDoc(gameDoc, {
                    [key]: this.state.player == 1 ? "X" : "O",
                    "turn": this.state.player == 1 ? 2 : 1,
                    "lastl3": l3,
                    "lastl2": l2,
                    "lastl1": l1
                });

                this.setState({
                    scoreL1: newScoreL1,
                    scoreL2: newScoreL2,
                    scoreL3: newScoreL3,
                    playablel2: newPlayableL2,
                    lastPlayedl3: l3,
                    lastPlayedl2: l2,
                    lastPlayedl1: l1,
                    winner: newWinner,
                    nplayable: Array(9).fill(null).map(() => Array(9).fill(null)),
                    currl3: -1,
                    currl2: -1,
                    currl1: -1,
                    opponentLastPlayed: false,
                    myturn: false
                });
            }

            else {
                this.setState({
                    scoreL1: newScoreL1,
                    scoreL2: newScoreL2,
                    scoreL3: newScoreL3,
                    playablel2: newPlayableL2,
                    lastPlayedl3: l3,
                    lastPlayedl2: l2,
                    lastPlayedl1: l1,
                    winner: newWinner,
                    nplayable: Array(9).fill(null).map(() => Array(9).fill(null)),
                    currl3: -1,
                    currl2: -1,
                    currl1: -1,
                    opponentLastPlayed: true,
                    myturn: true
                });
            }
        }
    }

    handleHover(l1, l2, l3) {
        const newNPlayable = Array(9).fill(null).map(() => Array(9).fill(null));
        if (this.state.playablel2[l3][l2] && !this.state.scoreL1[l3][l2][l1] && !this.state.winner) {
            const scoreL1 = JSON.parse(JSON.stringify(this.state.scoreL1));
            const scoreL2 = JSON.parse(JSON.stringify(this.state.scoreL2));
            const scoreL3 = JSON.parse(JSON.stringify(this.state.scoreL3));

            scoreL1[l3][l2][l1] = this.state.player ? "X" : "O";
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
            scoreL1: Array(9).fill(null).map(() => Array(9).fill(null).map(() => Array(9).fill(null))),
            scoreL2: Array(9).fill(null).map(() => Array(9).fill(null)),
            scoreL3: Array(9).fill(null),
            player: true,
            playablel2: Array(9).fill(null).map(() => Array(9).fill(1)),
            lastPlayedl3: -1,
            lastPlayedl2: -1,
            lastPlayedl1: -1,
            winner: null,
            currl1: -1,
            currl2: -1,
            currl3: -1,
            nplayable: Array(9).fill(null).map(() => Array(9).fill(null)),
            move: 0
        });
    }

    renderReset() {
        if (this.props.practice) {
            return <ResetButton reset={() => { this.reset() }}></ResetButton>;
        }
    }

    render() {


        let className = 'game';
        // if (!this.props.practice && this.state.move !== this.props.currentMove) {
        //   className += ' faded';
        // }

        return (
            <div className={className}>
                <table className="l3table">
                    <L3Board scoreL1={this.state.scoreL1} scoreL2={this.state.scoreL2} scoreL3={this.state.scoreL3}
                        onClick={(l1, l2, l3) => this.handleClick(l1, l2, l3, true)}
                        onMouseEnter={(l1, l2, l3) => this.handleHover(l1, l2, l3)}
                        playablel2={this.state.playablel2} nplayable={this.state.nplayable} player={this.state.player}
                        lastPlayedl3={this.state.lastPlayedl3} lastPlayedl2={this.state.lastPlayedl2} lastPlayedl1={this.state.lastPlayedl1}
                        currl1={this.state.currl1} currl2={this.state.currl2} currl3={this.state.currl3}
                        size={'l3'}
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

export default L3GameOnline;
