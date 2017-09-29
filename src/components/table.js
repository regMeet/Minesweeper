import React, { Component } from 'react';
import Cell from './cell';

class Table extends Component {

  displayRows = (row)=> {

    row.map((cell, index) => {
      console.log('cell:', cell);

      return (
        <td className="Cell">
          <Cell data={cell} />
        </td>
      );
    });
  }


  displayTable = (table)=> {

    table.map( (row, index) => {

      return (
        <tr>
          {this.displayRows(row)}
        </tr>
      );
    });
  }


  render() {
    var table = this.props.table;

    if (!table) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>
        <table >
          <tbody>
            {this.displayTable(table)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
