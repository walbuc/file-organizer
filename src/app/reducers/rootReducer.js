import { combineReducers } from "redux";
import entities from "./entitiesReducer";
import paginator from "./paginatorReducer";
import tags from "./tagReducer";
import files from "./fileReducer";

export default combineReducers({
  entities,
  paginator,
  tags,
  files
});
