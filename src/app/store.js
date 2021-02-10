import { createStore, combineReducers } from "redux";
import content from "../content/reducer";
import auth from "../auth/reducer";

const allReducers = combineReducers({
  content,
  auth
});

const store = createStore(allReducers);

export default store;