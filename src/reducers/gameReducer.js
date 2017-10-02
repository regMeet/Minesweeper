import {SET_LEVEL, OPEN_HELP_MODAL, CLOSE_HELP_MODAL} from '../actions';

import {LEVEL_EASY} from '../actions';

const INITIAL_STATE = {
  level: LEVEL_EASY,
  isHelpModalOpen: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type){
    case SET_LEVEL:
      return {...state, level: action.level};
    case OPEN_HELP_MODAL:
      return {...state, isHelpModalOpen: true};
    case CLOSE_HELP_MODAL:
      return {...state, isHelpModalOpen: false};
    default:
      return state;
  }

}