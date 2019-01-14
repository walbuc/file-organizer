import { combineReducers } from "redux";
import {
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_ERROR,
  TAG_SELECTED
} from "app/actions/types";

const currentTag = (state = null, action) => {
  switch (action.type) {
    case TAG_SELECTED:
      return setcurrentTag(state, action);
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case FETCH_TAGS_REQUEST:
      return true;
    case FETCH_TAGS_SUCCESS:
    case FETCH_TAGS_ERROR:
      return false;
    default:
      return state;
  }
};
const errorMessage = (state = null, action) => {
  switch (action.type) {
    case FETCH_TAGS_ERROR:
      return action.error;
    case FETCH_TAGS_SUCCESS:
      return null;
    default:
      return state;
  }
};

function setcurrentTag(state = { id: null }, action) {
  switch (action.type) {
    case TAG_SELECTED:
      return action.payload;
    default:
      return state;
  }
}
export default combineReducers({ isLoading, errorMessage, currentTag });
