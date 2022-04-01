import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const DEFAULT_STATE = {
  error: { message: null }
};
<<<<<<< HEAD
export const store = createStore(
  rootReducer,
  DEFAULT_STATE,
  compose(
    applyMiddleware(thunk),
    window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_
  )
);
=======
export const store = createStore(rootReducer, DEFAULT_STATE);
>>>>>>> dfd86bdfbd2e124c235d654443853ba88daa3b62
