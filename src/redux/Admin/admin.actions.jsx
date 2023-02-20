import axios from "axios";
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

export const loginGoogle = (response) => async (dispatch) => {
  dispatch({
    type: SIGNIN_REQUEST,
    payload: { response },
  });
  try {
    const { data } = await axios.post("/api/admin/signin", {
      response,
    });
    dispatch({ type: SIGNIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createNewEvent =
  (
    title,
    description,
    venue,
    date,
    startTime,
    endTime,
    registrationDeadline,
    attendees
  ) =>
  async (dispatch) => {
    dispatch({
      type: CREATE_EVENT_REQUEST,
      payload: {
        title,
        description,
        venue,
        date,
        startTime,
        endTime,
        registrationDeadline,
        attendees,
      },
    });
    try {
      const { data } = await axios.post("/api/admin/createEvent", {
        title: title,
        description: description,
        venue: venue,
        date: date,
        startTime: startTime,
        endTime: endTime,
        registrationDeadline: registrationDeadline,
        attendees: attendees,
      });
      dispatch({ type: CREATE_EVENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_EVENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateEvent =
  (
    title,
    description,
    venue,
    date,
    startTime,
    endTime,
    registrationDeadline,
    attendees,
    eventId,
    id
  ) =>
  async (dispatch) => {
    dispatch({
      type: UPDATE_EVENT_REQUEST,
      payload: {
        title,
        description,
        venue,
        date,
        startTime,
        endTime,
        registrationDeadline,
        attendees,
        eventId,
        id,
      },
    });
    try {
      const { data } = await axios.post(`/api/admin/updateEvent/${id}`, {
        title: title,
        description: description,
        venue: venue,
        date: date,
        startTime: startTime,
        endTime: endTime,
        registrationDeadline: registrationDeadline,
        attendees: attendees,
        eventId: eventId,
      });
      dispatch({ type: UPDATE_EVENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_EVENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getAllEvents = () => async (dispatch) => {
  dispatch({
    type: ALL_EVENTS_REQUEST,
    payload: {},
  });
  try {
    const { data } = await axios.get("/api/admin/events");
    dispatch({ type: ALL_EVENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_EVENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getEventDetail = (id) => async (dispatch) => {
  dispatch({
    type: EVENT_DETAIL_REQUEST,
    payload: {},
  });
  try {
    const { data } = await axios.get(`/api/admin/event/${id}`);
    dispatch({ type: EVENT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EVENT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteEvent = (eventId, id) => async (dispatch) => {
  dispatch({
    type: DELETE_EVENT_REQUEST,
    payload: { eventId, id },
  });
  try {
    const { data } = await axios.post(`/api/admin/delete/${id}`, {
      eventId: eventId,
    });
    dispatch({ type: DELETE_EVENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_EVENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: SIGNOUT });
};
