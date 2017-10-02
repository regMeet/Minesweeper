import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import tableReducer from './tableReducer';

const rootReducer = combineReducers({
  game: gameReducer,
  table: tableReducer
});

export default rootReducer;
