import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewGame, openCell } from '../actions';

import Table from './table';
import TimerComponent from './timerComponent';

class Minesweeper extends Component {

  componentDidMount(){
    this.props.createNewGame();
  }

  openCell = (data) => {
    this.props.openCell(data);
  }

  render() {
    if (!this.props.table){
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>
        Minesweeper

        <TimerComponent status={this.props.status}/>
        <Table table={this.props.table} openCell={this.openCell} />
        {this.props.status}
      </div>

    );
  }
}

function mapStateToProps(state) {

  return {
    table: state.table.board,
    status: state.table.status
  }
}


export default connect(mapStateToProps, { createNewGame, openCell })(Minesweeper);
