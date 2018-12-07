export const RECEIVE_PATIENTS = 'RECEIVE_PATIENTS';

export function receivePatients(patients) {
  return {
    patients,
    type: RECEIVE_PATIENTS,
  };
}

function patientsReducer(state = [], action) {
  switch(action.type) {
    case RECEIVE_PATIENTS:
      return action.patients;
    default:
      return state;
  }
}

export default patientsReducer;
