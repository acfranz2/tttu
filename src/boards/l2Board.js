import React from 'react'
import L1Board from './l1Board'
import './board.css'

class L2Board extends React.Component {

  renderL1Board(l2) {
    let lp1 = -1;

    if (l2 === this.props.lastPlayedl2) {
      lp1 = this.props.lastPlayedl1;
    }


    return (
      //<td>    
        <L1Board
          score={this.props.score[l2]}
          onClick={(l1) => this.props.onClick(l1, l2)}
          onMouseEnter={(l1) => this.props.onMouseEnter(l1, l2)}
          playable={this.props.playablel2[l2]}
          nplayable={this.props.nplayable[l2]}
          player={this.props.player}
          lastPlayedl1={lp1}
        />
      //</td>    
    );
  }

  render() {
    return (  
      <tbody>
        <tr>
          <td id={"cell0"}><table>{this.renderL1Board(0)}</table></td>
          <td id={"cell1"}><table>{this.renderL1Board(1)}</table></td>
	  <td id={"cell2"}><table>{this.renderL1Board(2)}</table></td>
        </tr>
        <tr>
          <td id={"cell3"}><table>{this.renderL1Board(3)}</table></td>
	  <td id={"cell4"}><table>{this.renderL1Board(4)}</table></td>
	  <td id={"cell5"}><table>{this.renderL1Board(5)}</table></td>
        </tr>
        <tr>
          <td id={"cell6"}><table>{this.renderL1Board(6)}</table></td>
	  <td id={"cell7"}><table>{this.renderL1Board(7)}</table></td>
	  <td id={"cell8"}><table>{this.renderL1Board(8)}</table></td>
        </tr>
      </tbody>
    );
  }
}

export default L2Board;
