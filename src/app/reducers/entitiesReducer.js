import { FETCH_TAGS_SUCCESS, FETCH_FILES_SUCCESS } from "app/actions/types";

import orm from "app/orm";

const initialState = orm.getEmptyState();

const entities = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TAGS_SUCCESS:
      return fetchTags(state, action.payload);
    case FETCH_FILES_SUCCESS:
      return fetchFiles(state, action.payload);
    default:
      return state;
  }
};

const fetchTags = (state, payload) => {
  const session = orm.session(state);
  const { Tag } = session;
  const { tags } = payload;
  tags.forEach(tag => Tag.parse(tag));
  return session.state;
};

const fetchFiles = (state, payload) => {
  const session = orm.session(state);
  const { File } = session;
  const { files, tag } = payload;
  files.forEach(file => File.parse({ ...file, tag }));
  return session.state;
};

export default entities;
