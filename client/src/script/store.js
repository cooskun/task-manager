import { createStore } from "redux";

const SET_USER = "SET_USER";
const TOGGLE_LOGIN = "TOGGLE_LOGIN";
const FETCH_TASKS = "FETCH_TASKS";

export const setUser = user => ({ type: SET_USER, payload: user });

export const toggleLogin = isLogged => ({
  type: TOGGLE_LOGIN,
  payload: !store.getState().isLogged
});

export const fetchTasks = tasks => ({
  type: FETCH_TASKS,
  payload: tasks
});

const initialState = {
  user: "",
  isLogged: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      state.user = action.payload;
      return state;
    case TOGGLE_LOGIN:
      state.isLogged = action.payload;
      return state;
    case FETCH_TASKS:
      state.tasks = action.payload;
      return state;
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
