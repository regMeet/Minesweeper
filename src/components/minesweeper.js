import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewGame } from '../actions';

import Table from './table';

class Minesweeper extends Component {

  componentDidMount(){
    this.props.createNewGame();
  }

  render() {
    return (
      <div>
        Minesweeper
        <Table table={this.props.table} />
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    table: state.table.data
  }
}


export default connect(mapStateToProps, { createNewGame })(Minesweeper);
