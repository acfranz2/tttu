import React from 'react'
import './board.css'

class L1Board extends React.Component {
  renderCell(i) {
    return null;
  }

  render() {
    return (
      <div className="l1board">
	<button className="cell" onClick={() => this.onClick()}>{this.renderCell(0)}</button>
	<button className="cell" onClick={() => this.onClick()}>{this.renderCell(1)}</button>
	<button className="cell" onClick={() => this.onClick()}>{this.renderCell(2)}</button>
	<button className="cell" onClick={() => this.onClick()}>{this.renderCell(3)}</button>
	<button className="cell" onClick={() => this.onClick()}>{this.renderCell(4)}</button>
	<button className="cell" onClick={() => this.onClick()}>{this.renderCell(5)}</button>
	<button className="cell" onClick={() => this.onClick()}>{this.renderCell(6)}</button>
	<button className="cell" onClick={() => this.onClick()}>{this.renderCell(7)}</button>
	<button className="cell" onClick={() => this.onClick()}>{this.renderCell(8)}</button>
      </div>
    );
  }

  onClick() {
    console.log("click");
  }
}

export default L1Board;
