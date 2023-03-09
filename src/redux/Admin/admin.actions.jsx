import axios from "axios";
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

export const loginGoogle = (response) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/admin/signin", {
      response,
    });
    dispatch({ type: SIGNIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log("loginGoogle", error);
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
      console.log("createNewEvent", error);
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
      console.log("updateEvent", error);
    }
  };

export const getAllEvents = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/admin/events");
    dispatch({ type: ALL_EVENTS_SUCCESS, payload: data });
  } catch (error) {
    console.log("getAllEvents", error);
  }
};

export const updateSuccess = () => async (dispatch) => {
  dispatch({
    type: UPDATE_SUCCESS,
    payload: false,
  });
};

export const getEventDetail = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/admin/event/${id}`);
    dispatch({ type: EVENT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    console.log("getEventDetail", error);
  }
};

export const deleteEvent = (eventId, id) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/admin/delete/${id}`, {
      eventId: eventId,
    });
    dispatch({ type: DELETE_EVENT_SUCCESS, payload: data });
  } catch (error) {
    console.log("deleteEvent", error);
  }
};

export const signout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: SIGNOUT });
};
