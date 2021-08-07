import React from 'react'
import L2Board from './l2Board'
import './board.css'

class L3Board extends React.Component {

  renderL2Board(l3) {
    //const arr = 
    //for(var i = 0; i < 9; i++) {
    //  for(var j = 0; j < 9; j++) {

    let lp2 = -1;
    let lp1 = -1;

    if (l3 === this.props.lastPlayedl3) {
      lp2 = this.props.lastPlayedl2;
      lp1 = this.props.lastPlayedl1;

    }

    return (
      <L2Board
        score={this.props.score[l3]}
        onClick={(l1, l2) => { this.props.onClick(l1, l2, l3); console.log(l3, this.props.score[l3]); }}
        onMouseEnter={(l1, l2) => this.props.onMouseEnter(l1, l2, l3)}
        playablel2={this.props.playablel2[l3]}
        nplayable={this.props.nplayable[l3]}
        player={this.props.player}
        lastPlayedl2={lp2}
        lastPlayedl1={lp1}

      />
    );
  }

  render() {

    return (
      <tbody>
	<tr>
          <td id={"cell0"}><table>{this.renderL2Board(0)}</table></td>
          <td id={"cell1"}><table>{this.renderL2Board(1)}</table></td>
	  <td id={"cell2"}><table>{this.renderL2Board(2)}</table></td>
        </tr>
	<tr>
	  <td id={"cell3"}><table>{this.renderL2Board(3)}</table></td>
	  <td id={"cell4"}><table>{this.renderL2Board(4)}</table></td>
	  <td id={"cell5"}><table>{this.renderL2Board(5)}</table></td>
	</tr>
	<tr>
          <td id={"cell6"}><table>{this.renderL2Board(6)}</table></td>
	  <td id={"cell7"}><table>{this.renderL2Board(7)}</table></td>
	  <td id={"cell8"}><table>{this.renderL2Board(8)}</table></td>
	</tr> 
      </tbody>
    );
  }
}

export default L3Board;
