import React from 'react'
import L2Board from './l2Board'
import './board.css'

class L3Board extends React.Component {
  renderL2Board(i) {
    return (
      <L2Board
        //value={this.props.l1Boards[i]}
      />
    );
  }

  render() {
    return (
      <div className="l3board">
        <div>{this.renderL2Board(0)}</div>
	<div>{this.renderL2Board(1)}</div>
        <div>{this.renderL2Board(2)}</div>
        <div>{this.renderL2Board(3)}</div>
        <div>{this.renderL2Board(4)}</div>
        <div>{this.renderL2Board(5)}</div>
        <div>{this.renderL2Board(6)}</div>
        <div>{this.renderL2Board(7)}</div>
        <div>{this.renderL2Board(8)}</div>
      </div>
    );
  }
}

export default L3Board;
