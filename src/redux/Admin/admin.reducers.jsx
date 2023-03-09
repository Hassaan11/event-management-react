import {
  SIGNIN_SUCCESS,
  SIGNOUT,
  ALL_EVENTS_SUCCESS,
  EVENT_DETAIL_SUCCESS,
  CREATE_EVENT_SUCCESS,
  UPDATE_EVENT_SUCCESS,
  DELETE_EVENT_SUCCESS,
  UPDATE_SUCCESS,
} from "./admin.constants";

export const AdminReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SUCCESS:
      return { success: false };
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        success: true,
        createdEvent: action.payload.event,
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        success: true,
        events: action.payload.events,
      };
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        success: true,
      };
    case ALL_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
      };
    case EVENT_DETAIL_SUCCESS:
      return {
        ...state,
        event: action.payload,
      };

    default:
      return state;
  }
};

export const loginGoogleReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        loading: false,
        ...state,
        // "state.login.userInfo": action.payload,
        userInfo: action.payload,
      };
    case SIGNOUT:
      return {};
    default:
      return state;
  }
};
