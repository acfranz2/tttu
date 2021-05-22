import React from 'react'
import L1Board from './l1Board'
import './board.css'

class L2Board extends React.Component {
  renderL1Board(i) {
    return (
      <L1Board />
    );
  }

  render() {
    return (
      <div className="l2board">
	<div>{this.renderL1Board(0)}</div>
	<div>{this.renderL1Board(1)}</div>
	<div>{this.renderL1Board(2)}</div>
	<div>{this.renderL1Board(3)}</div>
	<div>{this.renderL1Board(4)}</div>
	<div>{this.renderL1Board(5)}</div>
	<div>{this.renderL1Board(6)}</div>
	<div>{this.renderL1Board(7)}</div>
	<div>{this.renderL1Board(8)}</div>
      </div>
    );
  }
}

export default L2Board;
