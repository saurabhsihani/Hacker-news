import React, { useContext, useEffect, useReducer } from 'react'

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'
import reducer from './reducer'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

const initialState = {
  loading: false,
  query: 'REACT',
  stories: [],
  page: 0,
  totalPages: 0
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    const url = `${API_ENDPOINT}query=${state.query}&page=${state.page}`;
    dispatch({ type: SET_LOADING, payload: true });

    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      dispatch({ type: SET_STORIES, payload: jsonData });
    }
    catch(err) {
      console.log(err);
    }
    dispatch({ type: SET_LOADING, payload: false });
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.query, state.page]);

  const setPage = p => {
    dispatch({ type: HANDLE_PAGE, payload: p });
  }

  const handleSearch = value => {
    dispatch({ type: HANDLE_SEARCH, payload: value });
  }

  const removeStory = id => {
    dispatch({ type: REMOVE_STORY, payload: id })
  }

  return (
    <AppContext.Provider value={{
      state,
      setPage,
      handleSearch,
      removeStory
    }}>
      {children}
    </AppContext.Provider>
  );
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
