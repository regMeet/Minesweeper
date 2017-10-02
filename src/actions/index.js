

export const CREATE_NEW_GAME = 'create_new_game';
export const OPEN_CELL = 'open_cell';

export function createNewGame() {

  return {
    type: CREATE_NEW_GAME
  };
}

export function openCell(cell) {
  return {
    type: OPEN_CELL,
    data: cell
  };
}