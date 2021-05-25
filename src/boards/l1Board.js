import React from 'react'
import './board.css'

class L1Board extends React.Component {
  renderCell(l1) {
    //console.log(this.props.score);

    let cellType = "cell";

    // check to see if cell is in next playable area
    if (this.props.playable) {
      if (this.props.player) {
        cellType = "playableCell1";
      }
      else {
        cellType = "playableCell2";
      }
    }

    // check to see if cell was just played
    if (this.props.lastPlayedl1 === l1) {
      if (this.props.player) {
        cellType = "lastPlayedCell2";
      }
      else {
        cellType = "lastPlayedCell1";
      }
    }

    return (
      <button
        className={cellType}
        onClick={() => this.props.onClick(l1)}>{this.props.score[l1]}
      </button>
    );
  }

  render() {
    return (
      <div className="l1board">
        {this.renderCell(0)}
        {this.renderCell(1)}
        {this.renderCell(2)}
        {this.renderCell(3)}
        {this.renderCell(4)}
        {this.renderCell(5)}
        {this.renderCell(6)}
        {this.renderCell(7)}
        {this.renderCell(8)}
      </div>
    );
  }
}

export default L1Board;
