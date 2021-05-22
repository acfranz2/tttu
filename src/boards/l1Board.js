import React from 'react'

function Cell(props) {
  return (
    <button classname="cell" onClick={() => console.log("click")}>
      {props.value}
    </button>
  );
}

class L1Board extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCell(i) {
    return (
      <Cell
	//value={this.props.cells[i]}
	//onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
	<div>
	  {this.renderCell(0)}
	  {this.renderCell(1)}
	  {this.renderCell(2)}
	</div>
	<div>
	  {this.renderCell(3)}
	  {this.renderCell(4)}
	  {this.renderCell(5)}
	</div>
	<div>
	  {this.renderCell(6)}
	  {this.renderCell(7)}
	  {this.renderCell(8)}
        </div>
      </div>
    );
  }
}

export default L1Board;
