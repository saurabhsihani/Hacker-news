import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'

const reducer = (state, action) => {
  switch(action.type) {
    case HANDLE_SEARCH:
      return {
        ...state,
        query: action.payload,
        page: 0
      };

    case HANDLE_PAGE:
      let p = action.payload;
      if(p > state.totalPages - 1) {
        p = 0;
      }
      else if(p < 0) {
        p = state.totalPages - 1;
      }
      return {
        ...state,
        page: p
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case SET_STORIES:
      return {
        ...state,
        stories: action.payload.hits,
        totalPages: action.payload.nbPages
      };

    case REMOVE_STORY:
      return {
        ...state,
        stories: state.stories.filter(story => story.objectID !== action.payload)
      };

    default:
      throw new Error(`no matching ${action.type} action type`);
  }
}

export default reducer
