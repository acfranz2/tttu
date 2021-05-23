import React from 'react'
import L1Board from './l1Board'
import './board.css'

class L2Board extends React.Component {
  renderL1Board(l2) {
    return (
      <L1Board 
	score={this.props.score[l2]}
	onClick={(l1) => this.props.onClick(l1, l2)}
      />
    );
  }

  render() {
    return (
      <div className="l2board">
        {this.renderL1Board(0)}
	{this.renderL1Board(1)}
	{this.renderL1Board(2)}
	{this.renderL1Board(3)}
	{this.renderL1Board(4)}
	{this.renderL1Board(5)}
	{this.renderL1Board(6)}
	{this.renderL1Board(7)}
	{this.renderL1Board(8)}
      </div>
    );
  }
}

export default L2Board;
