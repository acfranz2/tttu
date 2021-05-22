import React from 'react'
import L1Board from './l1Board'
import './board.css'

class L2Board extends React.Component {
  renderL1Board(i) {
    return (
      <L1Board 
	//value={this.props.l1Boards[i]}
      />
    );
  }

  render() {
    return (
      <div>
	<div className="l2board-row">
	  {this.renderL1Board(0)}
	  {this.renderL1Board(1)}
	  {this.renderL1Board(2)}
        </div>
	<div className="l2board-row">
	  {this.renderL1Board(3)}
	  {this.renderL1Board(4)}
	  {this.renderL1Board(5)}
	</div>
	<div className="l2board-row">
	  {this.renderL1Board(6)}
	  {this.renderL1Board(7)}
	  {this.renderL1Board(8)}
	</div>
      </div>
    );
  }
}

export default L2Board;
