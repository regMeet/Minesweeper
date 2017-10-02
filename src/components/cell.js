import React, { Component } from 'react';

class Cell extends Component {

  renderCellStatus = (data) => {
    if (data.isOpened) {
      if (data.hasMine) {
        return (
          <div className="Cell__cover Cell__cover--opened">
            <span className="Cell__bomb">b</span>
          </div>
        );
      } else {
        return (
          <div className="Cell__cover Cell__cover--opened">
            <span className={"Cell__number"+this.props.data.count}>{this.props.data.count}</span>
          </div>
        );
      }
    }else if (data.hasFlag) {
      return (
        <div className="Cell__cover Cell__cover--opened">
          <span className="Cell__flag">f</span>
        </div>
      );
    } else {
      return (
        <div className="Cell__cover"></div>
      );
    }
  }

  render() {
    var data = this.props.data;

    return (
      <div className="Cell" onClick={() => this.props.openCell(data)} >
        {this.renderCellStatus(data)}
      </div>
    );
  }
}

export default Cell;