import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewGame, openCell, markFlag, setLevel, openHelpModal, closeHelpModal } from '../actions';
import {LEVEL_EASY, LEVEL_NORMAL, LEVEL_HARD} from '../actions';
import Table from './table';
import TimerComponent from './timerComponent';
import HelpModal from './helpModal';

class Minesweeper extends Component {

  componentDidMount(){
    this.props.createNewGame(this.props.level);
  }

  openCell = (data) => {
    this.props.openCell(data);
  };

  markFlag = (data) => {
    this.props.markFlag(data);
  };

  setLevel = (level) => {
    this.props.setLevel(level);
    this.props.createNewGame(level);
  };

  restartLevel = () => {
    this.props.createNewGame(this.props.level);
  };

  displayRadioLevel = (level, checked) => {
    return (
      <label>
        <input type="radio" value={level} name="level" defaultChecked={checked} />
        {level}
      </label>
    );
  };

  render() {
    if (!this.props.table){
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>
        Minesweeper

        <div className={"MineSweeper " + this.props.level}>
          <div className="MineSweeper__level" onChange={event => this.setLevel(event.target.value)}>
            {this.displayRadioLevel(LEVEL_EASY, true)}
            {this.displayRadioLevel(LEVEL_NORMAL)}
            {this.displayRadioLevel(LEVEL_HARD)}
          </div>

          <span className="MineSweeper__face" onClick={() => this.restartLevel()}>
              <span className={"button " + this.props.status}></span>
          </span>

          <span className="MineSweeper__time">
            <TimerComponent status={this.props.status}/>
          </span>

          <span className="MineSweeper__flagNum">{this.props.flags}</span>

          <Table table={this.props.table} openCell={this.openCell} markFlag={this.markFlag} />
        </div>

        <button onClick={() => this.props.openHelpModal()}>
          Help: How to play?
        </button>

        <HelpModal isHelpModalOpen={this.props.isHelpModalOpen} onClose={ () => this.props.closeHelpModal() } />

      </div>

    );
  }
}

function mapStateToProps(state) {

  return {
    level: state.game.level,
    isHelpModalOpen: state.game.isHelpModalOpen,
    table: state.table.board,
    status: state.table.status,
    flags: state.table.flags
  }
}


export default connect(mapStateToProps, { createNewGame, openCell, markFlag, setLevel, openHelpModal, closeHelpModal })(Minesweeper);
