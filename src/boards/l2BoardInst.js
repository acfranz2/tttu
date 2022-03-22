import React from 'react';
import L1BoardInst from './l1BoardInst';
import './board.css';

class L2BoardInst extends React.Component {

  renderL1Board(l2) {
    let tableClass = "l1table";
    if(this.props.highlight && l2 === 5) {
      tableClass += " highlight";
    }

    return (
      <table className={tableClass}>
        <L1BoardInst scoreL1={Array(9).fill(null)}/>
      </table>
    );
  }

  render() {
    let size = '';
    return (
      <tbody>
        <tr>
          <td id={"cellL20" + size}>{this.renderL1Board(0)}</td>
          <td id={"cellL21" + size}>{this.renderL1Board(1)}</td>
          <td id={"cellL22" + size}>{this.renderL1Board(2)}</td>
        </tr>
        <tr>
          <td id={"cellL23" + size}>{this.renderL1Board(3)}</td>
          <td id={"cellL24" + size}>{this.renderL1Board(4)}</td>
          <td id={"cellL25" + size}>{this.renderL1Board(5)}</td>
        </tr>
        <tr>
          <td id={"cellL26" + size}>{this.renderL1Board(6)}</td>
          <td id={"cellL27" + size}>{this.renderL1Board(7)}</td>
          <td id={"cellL28" + size}>{this.renderL1Board(8)}</td>
        </tr>
      </tbody>
    );
  }
}

export default L2BoardInst;
