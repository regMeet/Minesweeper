import React, { Component } from 'react';

import {STATUS_INITIAL, STATUS_PLAYING} from '../reducers/tableReducer';

class TimerComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      time: 0,
      timer: null,
      status: props.status
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.state.status === STATUS_INITIAL && nextProps.status !== STATUS_INITIAL){
      this.onStart();
    }
    if (this.state.status === STATUS_PLAYING && nextProps.status !== STATUS_PLAYING){
      this.onStop();
    }

    this.setState({
      status: nextProps.status
    });
  }

  updateTimer = () => {
    this.setState({
      time: this.state.time + 1
    })
  }

  onStart = () => {
    this.setState({
      time: 0,
      timer: setInterval(this.updateTimer, 1000)
    })
  }

  onStop = () => {
    clearInterval(this.state.timer);
  }

  render() {
    return (
      <div>
        Time: {this.state.time}
      </div>
    );
  }
}

export default TimerComponent;
