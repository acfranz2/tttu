import React from 'react'
import L2Board from './l2Board'
import './board.css'

class L3Board extends React.Component {

  renderL2Board(l3) {

    let lp2 = -1;
    let lp1 = -1;
    let cp2 = -1;
    let cp1 = -1;

    if (l3 === this.props.lastPlayedl3) {
      lp2 = this.props.lastPlayedl2;
      lp1 = this.props.lastPlayedl1;
    }
    if (l3 === this.props.currl3) {
      cp2 = this.props.currl2;
      cp1 = this.props.currl1;
    }

    if (this.props.scoreL3[l3] === "drawn" || this.props.scoreL3[l3] === null)
      return (
        <table className={"l2table"}>
          <L2Board
            scoreL1={this.props.scoreL1[l3]}
            scoreL2={this.props.scoreL2[l3]}
            onClick={(l1, l2) => this.props.onClick(l1, l2, l3)}
            onMouseEnter={(l1, l2) => this.props.onMouseEnter(l1, l2, l3)}
            playablel2={this.props.playablel2[l3]}
            nplayable={this.props.nplayable[l3]}
            player={this.props.player}
            lastPlayedl2={lp2}
            lastPlayedl1={lp1}
            currl2={cp2}
            currl1={cp1}
            size={this.props.size}
            opponentLastPlayed={this.props.opponentLastPlayed}
          />
        </table>
      );
    else
      return (
        <div className="l3Score">
          {this.props.scoreL3[l3]}
        </div>
      );
  }

  render() {

    return (
      <tbody>
        <tr>
          <td id={"cellL30"}>{this.renderL2Board(0)}</td>
          <td id={"cellL31"}>{this.renderL2Board(1)}</td>
          <td id={"cellL32"}>{this.renderL2Board(2)}</td>
        </tr>
        <tr>
          <td id={"cellL33"}>{this.renderL2Board(3)}</td>
          <td id={"cellL34"}>{this.renderL2Board(4)}</td>
          <td id={"cellL35"}>{this.renderL2Board(5)}</td>
        </tr>
        <tr>
          <td id={"cellL36"}>{this.renderL2Board(6)}</td>
          <td id={"cellL37"}>{this.renderL2Board(7)}</td>
          <td id={"cellL38"}>{this.renderL2Board(8)}</td>
        </tr>
      </tbody>
    );
  }
}

export default L3Board;
