import generalReducer from './general';

const initialState = {
  post: {
    result: false,
    loading: false,
    error: false,
  },
};

const combineReducers = (reducers) => {
  return (state, action) => {
    return Object.keys(reducers).reduce((acc, prop) => {
      return {
        ...acc,
        ...reducers[prop]({ [prop]: acc[prop] }, action),
      };
    }, state);
  };
};

const appReducers = combineReducers({
  generalReducer,
});

export { initialState, combineReducers, appReducers };
