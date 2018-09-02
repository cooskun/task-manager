import { createStore } from "redux";

const SET_USER = "SET_USER";
const TOGGLE_LOGIN = "TOGGLE_LOGIN";

export const setUser = user => ({ type: SET_USER, payload: user });

export const toggleLogin = isLogged => ({
  type: TOGGLE_LOGIN,
  payload: !store.getState().isLogged
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
    default:
      return state;
  }
};

const store = createStore(rootReducer);

store.dispatch(setUser({ username: "admin", password: "st@mpen" }));

console.log(store.getState());

export default store;
