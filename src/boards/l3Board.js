import React from 'react'
import L2Board from './l2Board'
import './board.css'

class L3Board extends React.Component {
  renderL2Board(l3) {
    //const arr = 
    //for(var i = 0; i < 9; i++) {
    //  for(var j = 0; j < 9; j++) {
	
    return (
      <L2Board
        score={this.props.score[l3]}
	onClick={(l1, l2) => {this.props.onClick(l1, l2, l3); console.log(l3, this.props.score[l3]);}}
      />
    );
  }

  render() {
    return (
      <div className="l3board">
        {this.renderL2Board(0)}
	{this.renderL2Board(1)}
        {this.renderL2Board(2)}
        {this.renderL2Board(3)}
        {this.renderL2Board(4)}
        {this.renderL2Board(5)}
        {this.renderL2Board(6)}
        {this.renderL2Board(7)}
        {this.renderL2Board(8)}
      </div>
    );
  }
}

export default L3Board;
