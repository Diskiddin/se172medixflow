import { combineReducers } from 'redux';
import patientsReducer from './patientsState';
import entriesReducer from './entriesState';

const rootReducer = combineReducers({
  patients: patientsReducer,
  entries: entriesReducer,
});

export default rootReducer;
