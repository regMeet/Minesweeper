
import {CREATE_NEW_GAME, OPEN_CELL, MARK_FLAG} from '../actions';

export const STATUS_INITIAL = 'initial';
export const STATUS_PLAYING = 'playing';
export const STATUS_WIN = 'win';
export const STATUS_GAME_OVER = 'gameover';

const INITIAL_STATE = {
  status: STATUS_INITIAL,
  board: null,
  rows: 0,
  cols: 0,
  mines: 0,
  hit: 0,
  total: 0,
  flags: 0
};

function createCell(col, row){
  return {
    x : col,
    y : row,
    count : 0,
    isOpened: false,
    hasMine: false,
    hasFlag: false
  }
}


function createTable(rows, columns) {
  var table = [];

  for(var row = 0; row < rows; row++){
    table.push([]);
    for(var col = 0; col < columns; col++){
      table[row].push(createCell(col, row));
    }
  }

  return table;
}

/**
 * Precalculates what is the counter variable for each cell at the beginning.
 * @param table
 * @param rowNumber
 * @param colNumber
 * @param mine
 */
function countMines(table, rowNumber, colNumber, mine) {
  var row = mine.y;
  var col = mine.x;

  var minRow = Math.max(0, row-1);
  var maxRow = Math.min(rowNumber-1, row+1);
  var minCol = Math.max(0, col-1);
  var maxCol = Math.min(colNumber-1, col+1);

  for(var i = minRow; i <= maxRow; i++){
    for(var j = minCol; j <= maxCol; j++){
      var cell = table[i][j];
      if (cell.hasMine === false){
        cell.count++;
      }
    }
  }
}

/**
 * Inserts the mines into the board and then updates its surrounding cell counters.
 * @param table
 * @param rows
 * @param cols
 * @param mineNumber
 */
function insertMines(table, rows, cols, mineNumber) {
  let totalCellNumber = rows * cols;

  // insert mines in the board
  if (mineNumber < totalCellNumber){
    for (let i = 0; i < mineNumber; i++){
      var cell;
      do {
        cell = table[Math.floor(Math.random()*rows)][Math.floor(Math.random()*cols)]
      } while (cell.hasMine === true);

      cell.hasMine = true;

      countMines(table, rows, cols, cell);
    }
  }
}

/**
 * Opens a cell and if the cell is not a mine and it's counter is zero it will explore its surrounding cells.
 * @param state
 * @param cell
 * @returns {*}
 */
function updateStateOpeningCell(state, cell) {
  if (!cell.isOpened) {
    state = openCell(state, cell);

    if (cell.hasMine){
      return state;
    }

    // uncoverSurroundingEmptyCells
    if (cell.count === 0) {
      var row = cell.y;
      var col = cell.x;

      var minRow = Math.max(0, row-1);
      var maxRow = Math.min(state.rows-1, row+1);
      var minCol = Math.max(0, col-1);
      var maxCol = Math.min(state.cols-1, col+1);

      for(var i = minRow; i <= maxRow; i++){
        for(var j = minCol; j <= maxCol; j++){
          var tmp = state.board[i][j];

          if (!tmp.hasMine){
            state = updateStateOpeningCell(state, tmp)
          }
        }
      }
    }
  }

  return state;
}

/**
 * Updates the status from a cell, opening it. Also does a +1 to the global hit counter in order to know if the game is already won.
 *
 * @param state
 * @param cell
 * @returns {{board}}
 */
function openCell(state, cell) {
  return {...state,
    board: state.board.map(row =>
      row.map(col => (col.x === cell.x) && (col.y === cell.y)?
        // transform the one with a matching id
        {...col, isOpened: true, hit: state.hit++, flags: (cell.hasFlag? state.flags++: state.flags)}:
        // otherwise return original cell
        col
      )
    )
  };
}

function markFlag(state, cell) {
  return {...state,
    board: state.board.map(row =>
      row.map(col => (col.x === cell.x) && (col.y === cell.y)?
        // transform the one with a matching id
        {...col, hasFlag: !cell.hasFlag}:
        // otherwise return original cell
        col
      )
    )};
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type){
    case CREATE_NEW_GAME:
      let mines = action.payload.mines;
      let rows = action.payload.rows;
      let cols = action.payload.cols;

      const newTable = createTable(rows, cols);
      insertMines(newTable, rows, cols, mines);

      return {
        ...state,
        status: STATUS_INITIAL,
        board: newTable,
        rows: rows,
        cols: cols,
        mines: mines,
        hit: 0,
        total: rows * cols - mines,
        flags: mines
      };

    case OPEN_CELL:
      if (state.status !== STATUS_WIN && state.status !== STATUS_GAME_OVER) {
        var cell = action.data;

        var state = updateStateOpeningCell(state, cell);

        if (state.hit === state.total) {
          return {...state, status: STATUS_WIN};
        }

        if (cell.hasMine){
          return {...state, status: STATUS_GAME_OVER};
        }

        return {...state, status: STATUS_PLAYING};
      }

      return {...state};

    case MARK_FLAG:
      if (state.status !== STATUS_WIN && state.status !== STATUS_GAME_OVER) {
        var cell = action.data;
        var state = markFlag(state, cell);

        return {...state, flags: cell.hasFlag? state.flags + 1 : state.flags - 1 };
      }

      return {...state};

    default:
      return state;
  }

}