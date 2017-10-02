import {SET_LEVEL} from '../actions';

import {LEVEL_EASY} from '../actions';

const INITIAL_STATE = {
  level: LEVEL_EASY
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type){
    case SET_LEVEL:
      return {...state, level: action.level};
    default:
      return state;
  }

}