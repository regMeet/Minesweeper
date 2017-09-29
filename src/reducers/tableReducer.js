
import {CREATE_NEW_GAME} from '../actions';

const INITIAL_STATE = {
  rows: 9,
  cols: 9,
  minesNumber: 9,
  data: null
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

export default function (state = INITIAL_STATE, action) {
  switch (action.type){
    case CREATE_NEW_GAME:
      const newTable = createTable(state.rows, state.cols);

      return {...state, data: newTable};

    default:
      return state;
  }

}