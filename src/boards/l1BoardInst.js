import React from 'react'
import './board.css'

class L1BoardInst extends React.Component {
  renderCell(l1) {
    let cellType = "cell l3";
    let cellData = this.props.scoreL1[l1];

    if(this.props.highlight && l1 === 6) {
      cellType += ' highlight';
    }

    let marg = '1px';
    return (
      <td id={"cellL1" + l1}>
        <button
          className={cellType}>
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

export default L1BoardInst;
