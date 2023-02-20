import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT,
  ALL_EVENTS_FAIL,
  ALL_EVENTS_SUCCESS,
  ALL_EVENTS_REQUEST,
  EVENT_DETAIL_REQUEST,
  EVENT_DETAIL_SUCCESS,
  EVENT_DETAIL_FAIL,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
} from "./admin.constants";

export const loginGoogleReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return { loading: true };
    case SIGNIN_SUCCESS:
      return {
        loading: false,
        ...state,
        // "state.login.userInfo": action.payload,
        userInfo: action.payload,
      };
    case SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const createNewEventReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_EVENT_REQUEST:
      return { loading: true };
    case CREATE_EVENT_SUCCESS:
      return {
        loading: false,
        ...state,
        success: true,
      };
    case CREATE_EVENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteEventReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EVENT_REQUEST:
      return { loading: true };
    case DELETE_EVENT_SUCCESS:
      return {
        loading: false,
        ...state,
        success: true,
        events: action.payload.events,
      };
    case DELETE_EVENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateEventReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EVENT_REQUEST:
      return { loading: true };
    case UPDATE_EVENT_SUCCESS:
      return {
        loading: false,
        ...state,
        success: true,
      };
    case UPDATE_EVENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllEventsReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_EVENTS_REQUEST:
      return { loading: true };
    case ALL_EVENTS_SUCCESS:
      return {
        loading: false,
        ...state,
        events: action.payload,
      };
    case ALL_EVENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getEventDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_DETAIL_REQUEST:
      return { loading: true };
    case EVENT_DETAIL_SUCCESS:
      return {
        loading: false,
        ...state,
        event: action.payload,
      };
    case EVENT_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
