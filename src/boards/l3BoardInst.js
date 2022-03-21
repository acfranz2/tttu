import React from 'react';
import './board.css';
import L2BoardInst from './l2BoardInst';

class L3BoardInst extends React.Component {

  renderL2Board(l3) {
    return (
      <table className={"l2table"}>
        <L2BoardInst />
      </table>
    );
  }

  render() {

    return (
      <tbody>
        <tr>
          <td id={"cellL30"}>{this.renderL2Board(0)}</td>
          <td id={"cellL31"}>{this.renderL2Board(1)}</td>
          <td id={"cellL32"}>{this.renderL2Board(2)}</td>
        </tr>
        <tr>
          <td id={"cellL33"}>{this.renderL2Board(3)}</td>
          <td id={"cellL34"}>{this.renderL2Board(4)}</td>
          <td id={"cellL35"}>{this.renderL2Board(5)}</td>
        </tr>
        <tr>
          <td id={"cellL36"}>{this.renderL2Board(6)}</td>
          <td id={"cellL37"}>{this.renderL2Board(7)}</td>
          <td id={"cellL38"}>{this.renderL2Board(8)}</td>
        </tr>
      </tbody>
    );
  }
}

export default L3BoardInst;
