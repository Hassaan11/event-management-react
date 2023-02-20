import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import {
  getAllEventsReducer,
  loginGoogleReducer,
  getEventDetailReducer,
  createNewEventReducer,
  updateEventReducer,
  deleteEventReducer,
} from "./Admin/admin.reducers";

const initialState = {
  login: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const reducer = combineReducers({
  login: loginGoogleReducer,
  listEvents: getAllEventsReducer,
  eventDetail: getEventDetailReducer,
  createEvent: createNewEventReducer,
  updateEventDetail: updateEventReducer,
  eventDelete: deleteEventReducer,
});
// to show redux store in chrome developer tools is to update compose function
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
