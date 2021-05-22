import React from 'react'
import L2Board from './l2Board'

class L3Board extends React.Component {
  renderL2Board(i) {
    return (
      <L2Board
        value={this.props.l1Boards[i]}
      />
    );
  }

  render() {
    return (
      <div>
        <div>
          {this.renderL2Board(0)}
          {this.renderL2Board(1)}
          {this.renderL2Board(2)}
        </div>
        <div>
          {this.renderL2Board(3)}
          {this.renderL2Board(4)}
          {this.renderL2Board(5)}
        </div>
        <div>
          {this.renderL2Board(6)}
          {this.renderL2Board(7)}
          {this.renderL2Board(8)}
        </div>
      </div>
    );
  }
}

export default L3Board;
