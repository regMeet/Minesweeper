import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewGame, openCell, setLevel } from '../actions';
import {LEVEL_EASY, LEVEL_NORMAL, LEVEL_HARD} from '../actions';
import Table from './table';
import TimerComponent from './timerComponent';

class Minesweeper extends Component {

  componentDidMount(){
    this.props.createNewGame(this.props.level);
  }

  openCell = (data) => {
    this.props.openCell(data);
  }

  setLevel = (level) => {
    this.props.setLevel(level);
    this.props.createNewGame(level);
  }

  restartLevel = () => {
    this.props.createNewGame(this.props.level);
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

        <div onChange={event => this.setLevel(event.target.value)}>
          <input type="radio" value={LEVEL_EASY} name="level" defaultChecked /> easy
          <input type="radio" value={LEVEL_NORMAL} name="level"/> normal
          <input type="radio" value={LEVEL_HARD} name="level"/> hard
        </div>

        <span className="MineSweeper__face" onClick={() => this.restartLevel()}>
            <span className={"button " + this.props.status}></span>
        </span>

        <span className="MineSweeper__time">
          <TimerComponent status={this.props.status}/>
        </span>
        <Table table={this.props.table} openCell={this.openCell} />
        {this.props.status}
      </div>

    );
  }
}

function mapStateToProps(state) {

  return {
    level: state.game.level,
    table: state.table.board,
    status: state.table.status
  }
}


export default connect(mapStateToProps, { createNewGame, openCell, setLevel })(Minesweeper);
