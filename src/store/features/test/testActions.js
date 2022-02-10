import { setTest } from "./notesSlice";

//to call to api services
//   will be used later
//   import api from '../../services/api';

export const setNotesTrue = () => async (dispatch) => {
  dispatch(setTest(true));
};

export const setNotesFalse = () => async (dispatch) => {
  dispatch(setTest(false));
};
