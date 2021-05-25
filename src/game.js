import React from 'react'
import L3Board from './boards/l3Board'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: Array(9).fill(null).map(() => Array(9).fill(null).map(() => Array(9).fill(null))),
      player: true,
      playablel3: -1,
      playablel2: -1,
      lastPlayedl3: -1,
      lastPlayedl2: -1,
      lastPlayedl1: -1
    };
  }

  handleClick(l1, l2, l3) {
    console.log(this.state.playablel2 + ', ' + l1);
    console.log(this.state.playablel3 + ', ' + l2);

    if ((this.state.playablel3 === -1 && this.state.playablel2 === -1) ||
      (this.state.playablel3 === l3 && this.state.playablel2 === l2)) {
      const newScore = this.state.score;
      newScore[l3][l2][l1] = this.state.player ? "X" : "O";


      //console.log(l3 + 1, l2 + 1, l1 + 1);

      this.setState({
        score: newScore,
        player: !this.state.player,
        playablel3: l2,
        playablel2: l1,
        lastPlayedl3: l3,
        lastPlayedl2: l2,
        lastPlayedl1: l1
      });
    }
  }

  render() {
    return (
      <div className="game">
        <L3Board score={this.state.score} onClick={(l1, l2, l3) => this.handleClick(l1, l2, l3)}
          playablel3={this.state.playablel3} playablel2={this.state.playablel2} player={this.state.player}
          lastPlayedl3={this.state.lastPlayedl3} lastPlayedl2={this.state.lastPlayedl2} lastPlayedl1={this.state.lastPlayedl1}/>
      </div>
    );
  }
}

export default Game;