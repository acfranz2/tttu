import React from 'react'
import L1Board from './l1Board'
import './board.css'

class L2Board extends React.Component {

  renderL1Board(l2) {
    let lp1 = -1;
    let cp1 = -1;

    if (l2 === this.props.lastPlayedl2) {
      lp1 = this.props.lastPlayedl1;
    }
    if (l2 === this.props.currl2) {
      cp1 = this.props.currl1;
    }

    if (this.props.scoreL2[l2] === "drawn" || this.props.scoreL2[l2] === null)
      return (
        <table className={"l1table"}>
          <L1Board
            scoreL1={this.props.scoreL1[l2]}
            onClick={(l1) => this.props.onClick(l1, l2)}
            onMouseEnter={(l1) => this.props.onMouseEnter(l1, l2)}
            playable={this.props.playablel2[l2]}
            nplayable={this.props.nplayable[l2]}
            player={this.props.player}
            lastPlayedl1={lp1}
            currl1={cp1}
          />
        </table>
      );
    else
      return (
        <div className="l2Score">
          {this.props.scoreL2[l2]}
        </div>
      );
  }

  render() {
    return (
      <tbody>
        <tr>
          <td id={"cellL20"}>{this.renderL1Board(0)}</td>
          <td id={"cellL21"}>{this.renderL1Board(1)}</td>
          <td id={"cellL22"}>{this.renderL1Board(2)}</td>
        </tr>
        <tr>
          <td id={"cellL23"}>{this.renderL1Board(3)}</td>
          <td id={"cellL24"}>{this.renderL1Board(4)}</td>
          <td id={"cellL25"}>{this.renderL1Board(5)}</td>
        </tr>
        <tr>
          <td id={"cellL26"}>{this.renderL1Board(6)}</td>
          <td id={"cellL27"}>{this.renderL1Board(7)}</td>
          <td id={"cellL28"}>{this.renderL1Board(8)}</td>
        </tr>
      </tbody>
    );
  }
}

export default L2Board;
