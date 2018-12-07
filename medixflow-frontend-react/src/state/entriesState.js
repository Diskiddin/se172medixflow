export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';

export function receiveEntries(entries) {
  return {
    entries,
    type: RECEIVE_ENTRIES,
  };
}

function entriesReducer(state = [], action) {
  switch(action.type) {
    case RECEIVE_ENTRIES:
      return action.entries;
    default:
      return state;
  }
}

export default entriesReducer;
