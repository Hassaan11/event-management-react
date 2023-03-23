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

const API_URL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export const loginCode = (response) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/api/admin/auth/token`, {
      response,
    });
    dispatch({ type: SIGNIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log("loginGoogle", error);
  }
};

export const loginGoogle = (response) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/api/admin/signin`, {
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
  async (dispatch, getState) => {
    try {
      const {
        login: { userInfo },
      } = getState();

      const { data } = await axios.post(
        `${API_URL}/api/admin/createEvent`,
        {
          title: title,
          description: description,
          venue: venue,
          date: date,
          startTime: startTime,
          endTime: endTime,
          registrationDeadline: registrationDeadline,
          attendees: attendees,
        },
        { headers: { Authorization: `Bearer ${userInfo.user.token}` } }
      );
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
  async (dispatch, getState) => {
    try {
      const {
        login: { userInfo },
      } = getState();
      const { data } = await axios.post(
        `${API_URL}/api/admin/updateEvent/${id}`,
        {
          title: title,
          description: description,
          venue: venue,
          date: date,
          startTime: startTime,
          endTime: endTime,
          registrationDeadline: registrationDeadline,
          attendees: attendees,
          eventId: eventId,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.user.token}` },
        }
      );
      dispatch({ type: UPDATE_EVENT_SUCCESS, payload: data });
    } catch (error) {
      console.log("updateEvent", error);
    }
  };

export const getAllEvents = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/admin/events`);
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

export const getEventDetail = (id) => async (dispatch, getState) => {
  try {
    const {
      login: { userInfo },
    } = getState();
    const { data } = await axios.get(`${API_URL}/api/admin/event/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.user.token}` },
    });
    dispatch({ type: EVENT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    console.log("getEventDetail", error);
  }
};

export const deleteEvent = (eventId, id) => async (dispatch, getState) => {
  try {
    const {
      login: { userInfo },
    } = getState();
    const { data } = await axios.post(
      `${API_URL}/api/admin/delete/${id}`,
      {
        eventId: eventId,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.user.token}` },
      }
    );
    dispatch({ type: DELETE_EVENT_SUCCESS, payload: data });
  } catch (error) {
    console.log("deleteEvent", error);
  }
};

export const signout = () => async (dispatch, getState) => {
  try {
    const {
      login: { userInfo },
    } = getState();

    await axios
      .get(`${API_URL}/api/admin/logout`, {
        headers: { Authorization: `Bearer ${userInfo.user.token}` },
      })
      .then((res) => {
        localStorage.clear();
        window.location.href = "/login";
        dispatch({ type: SIGNOUT });
      });
  } catch (error) {
    console.log("signout Error", error);
  }
};
