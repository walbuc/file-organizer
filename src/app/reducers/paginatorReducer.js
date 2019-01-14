import { FETCH_FILES_SUCCESS, SET_CURRENT_PAGE } from "app/actions/types";

const paginator = (state = {}, action) => {
  switch (action.type) {
    case FETCH_FILES_SUCCESS:
      const { tag, files, page } = action.payload;
      const tagObj = state[tag];
      return {
        ...state,
        [tag]: {
          ...tagObj,
          currentPage: page,
          pages: {
            [page]: [...files.map(file => file.id)]
          }
        }
      };
    case SET_CURRENT_PAGE:
      return currentPage(state, action);
    default:
      return state;
  }
};

function currentPage(state, action) {
  const { payload } = action;
  const { tag, currentPage } = payload;
  const tagObj = state[tag];

  return {
    ...state,
    [tag]: {
      ...tagObj,
      currentPage
    }
  };
}
export default paginator;
