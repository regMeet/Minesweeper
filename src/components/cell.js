import React, { Component } from 'react';

class Cell extends Component {

  render() {
    console.log(this.props);

    var data = this.props.data;
    console.log(data)

    if (data.isOpened){
      if (data.hasMine) {
        return (
          <div className="mine">
            -1
          </div>
        );
      }

      if (data.hasFlag) {
        return (
          <div className="flag">
            -2
          </div>
        );
      }

      return (
        <div className="Cell">
          {this.props.data.count}
        </div>
      );
    } else {
      return (
        <div className="cover">
          -3
        </div>
      );
    }
  }

}

export default Cell;