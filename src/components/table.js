import React, { Component } from 'react';
import Cell from './cell';

class Table extends Component {

  // FIXME: no pude hacerlo andar
  displayRows = (row)=> {

    row.map((cell, index) => {
      return (
        <td className="Cell">
          <Cell data={cell} />
        </td>
      );
    });
  }


  displayTable = (table) => {

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

    return (
      <div>
        <table >
          <tbody>
            {
              table.map( (row, i) => {
                return (
                  <tr className="rows" key={i}>
                    {
                      row.map((cell, j) => {
                        return (
                          <td className="Cell" key={j}>
                            <Cell data={cell} openCell={this.props.openCell}/>
                          </td>
                        );
                     })
                    }
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
