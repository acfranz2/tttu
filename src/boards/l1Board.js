import React from 'react'
import './board.css'

class L1Board extends React.Component {
  renderCell(l1) {
    let cellType = "cell";
    let cellData = this.props.scoreL1[l1];

    if (this.props.currl1 === l1) {
      cellData = this.props.player ? 'X' : 'O';
    }

    // check to see if cell is in next playable area
    // check to see if cell was just played
    if (this.props.lastPlayedl1 === l1) {
      if (this.props.player) {
        cellType = "lastPlayedCell2";
      }
      else {
        cellType = "lastPlayedCell1";
      }
    }
    else if (this.props.playable) {
      if (this.props.player) {
        cellType = "playableCell1";
      }
      else {
        cellType = "playableCell2";
      }
    }
    else if (this.props.nplayable) {
      cellType = "nplayable";
    }

    if(this.props.size === 'l3') {
      cellType += " l3";
    }
    else if(this.props.size === 'l2') {
      cellType += " l2";
    }
    else {
      cellType += " l1";
    }

    if ((this.props.size === 'l1' && !this.props.scoreL1[l1]) || (this.props.playable && this.props.currl1 === l1)) {
      cellType += " hovered"
    }

    let size = this.props.size === 'l1' ? '-l1' : 
               (this.props.size === 'l1') ? '-l2' : '';
    let marg = this.props.size === 'l1' ? '24px' : 
               (this.props.size === 'l2') ? '8px' : '1px';
    return (
      <td id={"cellL1" + l1 + size}>
        <button
          className={cellType}
          onClick={() => this.props.onClick(l1)}
          onMouseEnter={() => this.props.onMouseEnter(l1)}>
          <p style={{margin: marg}}>{cellData}</p>
        </button>
      </td>
    );
  }

  render() {
    return (
      <tbody>
        <tr>
          {this.renderCell(0)}
          {this.renderCell(1)}
          {this.renderCell(2)}
        </tr>
        <tr>
          {this.renderCell(3)}
          {this.renderCell(4)}
          {this.renderCell(5)}
        </tr>
        <tr>
          {this.renderCell(6)}
          {this.renderCell(7)}
          {this.renderCell(8)}
        </tr>
      </tbody>
    );
  }
}

export default L1Board;
