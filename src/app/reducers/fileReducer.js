import { combineReducers } from "redux";
import {
  FETCH_FILES_SUCCESS,
  UPDATE_FILE_SUCCESS,
  FETCH_FILES_ERROR
} from "app/actions/types";

const successMessage = (state = null, action) => {
  switch (action.type) {
    case UPDATE_FILE_SUCCESS:
      return action.payload.message;
    case FETCH_FILES_SUCCESS:
    case FETCH_FILES_ERROR:
      return null;
    default:
      return state;
  }
};

export default combineReducers({ successMessage });
