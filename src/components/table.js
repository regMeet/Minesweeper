import React, { Component } from 'react';
import Cell from './cell';

class Table extends Component {

  renderRow = () => {
      return this.props.table.map( (row, i) => {
        return (
          <tr className="rows" key={i}>
            {
              this.renderCell(row)
            }
          </tr>
        );
      });
  };

  renderCell = (row) => {
    return (
      row.map((cell, j) => {
        return (
          <td className="Cell" key={j}>
            <Cell data={cell} openCell={this.props.openCell} markFlag={this.props.markFlag}/>
          </td>
        );
      })
    );
  };

  render() {
    return (
      <div>
        <table >
          <tbody>
            {this.renderRow()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
