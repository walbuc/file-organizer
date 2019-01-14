import axios from "axios";
import {
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_ERROR,
  FETCH_TAGS_REQUEST,
  FETCH_FILES_SUCCESS,
  FETCH_FILES_ERROR,
  FETCH_FILES_REQUEST,
  TAG_SELECTED,
  SET_CURRENT_PAGE,
  UPDATE_FILE_SUCCESS,
  UPDATE_FILE_ERROR
} from "./types";

const BASE_URL = "http://tim.uardev.com/trial-project/api/";
const TAGS_URL = "http://tim.uardev.com/trial-project/api/tags";
const FILES_URL = "http://tim.uardev.com/trial-project/api/files?page=";

export const updateFile = (id, { name }, setSubmitting) => async dispatch => {
  try {
    const result = await axios.post(`${BASE_URL}/file/${id}/rename`, {
      filename: name
    });
    dispatch({
      type: UPDATE_FILE_SUCCESS,
      payload: { message: result.data.message }
    });
    setSubmitting(false);
  } catch (error) {
    dispatch({
      type: UPDATE_FILE_ERROR,
      payload: { message: error.data.message || "Error updating file name." }
    });
  }
};

export const getTags = () => async dispatch => {
  try {
    dispatch({
      type: FETCH_TAGS_REQUEST
    });
    const result = await axios.get(TAGS_URL);

    dispatch({
      type: FETCH_TAGS_SUCCESS,
      payload: { tags: result.data }
    });
  } catch (error) {
    dispatch({
      type: FETCH_TAGS_ERROR,
      payload: "error"
    });
  }
};

export const getFiles = (tag, page = 1) => async dispatch => {
  try {
    const url = `${FILES_URL}${page}&tag=${tag}`;
    dispatch({
      type: FETCH_FILES_REQUEST
    });
    const result = await axios.get(url);

    dispatch({
      type: FETCH_FILES_SUCCESS,
      payload: {
        tag,
        page,
        files: result.data.files
      }
    });
  } catch (error) {
    dispatch({
      type: FETCH_FILES_ERROR,
      payload: "error loading files"
    });
  }
};

export function selectTag(tag) {
  return {
    type: TAG_SELECTED,
    payload: tag
  };
}

export function selectPage(tag, currentPage) {
  return {
    type: SET_CURRENT_PAGE,
    payload: { tag, currentPage }
  };
}
