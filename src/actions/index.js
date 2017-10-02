

export const CREATE_NEW_GAME = 'create_new_game';
export const OPEN_CELL = 'open_cell';
export const SET_LEVEL = 'set_level';
export const OPEN_HELP_MODAL = 'open_help_modal';
export const CLOSE_HELP_MODAL = 'close_help_modal';

export const LEVEL_EASY = 'easy';
export const LEVEL_NORMAL = 'normal';
export const LEVEL_HARD = 'hard';

const levelEasy= {mines: 10, rows: 9, cols: 9};
const levelNormal= {mines: 40, rows: 16, cols: 16};
const levelHard= {mines: 100, rows: 16, cols: 30};

export function createNewGame(level) {
  var payload = null;
  if (level === LEVEL_EASY){
    payload = levelEasy;
  } else if (level === LEVEL_NORMAL){
    payload = levelNormal;
  } else if (level === LEVEL_HARD){
    payload = levelHard;
  }

  return {
    type: CREATE_NEW_GAME,
    payload
  };
}

export function openCell(cell) {
  return {
    type: OPEN_CELL,
    data: cell
  };
}

export function setLevel(level) {
  return {
    type: SET_LEVEL,
    level
  };
}

export function openHelpModal(){
  return {
    type: OPEN_HELP_MODAL
  };
}

export function closeHelpModal(){
  return {
    type: CLOSE_HELP_MODAL
  };
}