import { TextField } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/Button/Button";
import LoadingBox from "../../components/Loading/LoadingBox";
import MessageBox from "../../components/MessageBox/MessageBox";
import MyNavbar from "../../components/Navbar/Navbar";
import {
  updateEvent,
  getEventDetail,
  updateSuccess,
} from "../../redux/Admin/admin.actions";

import "./Edit.css";

const EditEvent = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();

  const eventDetail = useSelector((state) => state.admin.event);

  const [title, setTitle] = useState(eventDetail?.title || "");
  const [description, setDescription] = useState(
    eventDetail?.description || ""
  );
  const [venue, setVenue] = useState(eventDetail?.venue || "");
  const [date, setDate] = useState(eventDetail?.eventDate || "");
  const [startTime, setStartTime] = useState(eventDetail?.eventStartTime || "");
  const [endTime, setEndTime] = useState(eventDetail?.eventEndTime || "");
  const [registrationDeadline, setRegistrationDeadline] = useState(
    eventDetail?.registrationDeadline || ""
  );
  const [email, setEmail] = useState("");
  const [attendee, setAttendee] = useState(eventDetail?.attendee || []);
  const [EmailError, setEmailError] = useState({});

  const validateEmail = (e) => {
    let errors = {};
    const emailValidation = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (e.target.value) {
      if (email.match(emailValidation)) {
        setAttendee([...attendee, { email: e.target.value }]);
        setEmail("");
        setEmailError({});
      } else {
        errors["email"] = "Enter Valid Email Address";
        setEmailError(errors);
      }
    }
  };

  const removeAttendee = (email) => {
    const r = attendee?.filter((a) => a.email !== email);
    setAttendee(r);
  };

  const updateEventDetail = useSelector((state) => state.admin);
  const { success } = updateEventDetail;

  if (success) {
    dispatch(updateSuccess());
    navigate(`/event/${id}`);
  }

  const update = () => {
    dispatch(
      updateEvent(
        title,
        description,
        venue,
        moment(date).format("YYYY-MM-DD"),
        startTime,
        endTime,
        moment(registrationDeadline).format("YYYY-MM-DD"),
        attendee,
        eventDetail?.eventId,
        id
      )
    );
  };

  useEffect(() => {
    dispatch(getEventDetail(id));
  }, [id]);

  useEffect(() => {
    setTitle(eventDetail?.title);
    setDescription(eventDetail?.description);
    setVenue(eventDetail?.venue);
    setDate(eventDetail?.eventDate);
    setStartTime(eventDetail?.eventStartTime);
    setEndTime(eventDetail?.eventEndTime);
    setRegistrationDeadline(eventDetail?.registrationDeadline);
    setAttendee(eventDetail?.attendee);
  }, [eventDetail]);

  return (
    <>
      <MyNavbar />
      {/* <ToastContainer /> */}
      <div className="mt-3 createEventContainer">
        <h3 className="text-center mb-3">Update Event</h3>
        <div className="input-fields">
          <div className="row">
            {success && (
              <MessageBox variant="success">
                Event Updated Successfully
              </MessageBox>
            )}
          </div>
          <div className="row mt-3">
            <div className="col-sm-6">
              <TextField
                id="title"
                label="Title"
                placeholder="Title"
                name="title"
                type="string"
                autoComplete="on"
                autoFocus
                error={!title}
                required
                fullWidth
                defaultValue={title}
                value={title}
                size="sm"
                color="primary"
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div className="col-sm-6">
              <TextField
                id="venue"
                label="Venue"
                placeholder="Venue"
                name="venue"
                type="string"
                autoComplete="on"
                error={!venue}
                required
                fullWidth
                defaultValue={venue}
                value={venue}
                size="sm"
                color="primary"
                variant="outlined"
                onChange={(e) => setVenue(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <TextField
                id="startTime"
                label="startTime"
                placeholder="Start Time"
                name="startTime"
                type="time"
                autoComplete="on"
                error={!startTime}
                required
                fullWidth
                defaultValue={startTime}
                value={startTime}
                size="sm"
                color="primary"
                variant="outlined"
                onChange={(e) => setStartTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div className="col-sm-4">
              <TextField
                id="endTime"
                label="endTime"
                placeholder="End Time"
                name="endTime"
                type="time"
                autoComplete="on"
                InputLabelProps={{ shrink: true }}
                error={!endTime}
                required
                fullWidth
                defaultValue={endTime}
                value={endTime}
                size="sm"
                color="primary"
                variant="outlined"
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div className="col-sm-4">
              <TextField
                id="date"
                label="date"
                placeholder="Date"
                name="date"
                type="date"
                autoComplete="on"
                InputLabelProps={{ shrink: true }}
                error={!date}
                required
                fullWidth
                defaultValue={date}
                value={moment(date).format("YYYY-MM-DD")}
                size="sm"
                color="primary"
                variant="outlined"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <TextField
                id="email"
                label="Attendee"
                placeholder="Attendee"
                name="email"
                type="email"
                autoComplete="on"
                InputLabelProps={{ shrink: true }}
                error={!email}
                required
                fullWidth
                value={email}
                defaultValue={email}
                size="sm"
                color="primary"
                variant="outlined"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    validateEmail(e);
                  }
                }}
                onBlur={(e) => {
                  validateEmail(e);
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col-sm-6">
              <TextField
                id="deadline"
                label="Registration Deadline"
                placeholder="Registration Deadline"
                name="deadline"
                type="date"
                autoComplete="on"
                InputLabelProps={{ shrink: true }}
                error={!registrationDeadline}
                required
                fullWidth
                defaultValue={registrationDeadline}
                value={moment(registrationDeadline).format("YYYY-MM-DD")}
                size="sm"
                color="primary"
                variant="outlined"
                onChange={(e) => setRegistrationDeadline(e.target.value)}
              />
            </div>
          </div>
          <div className="text-center alert-danger">{EmailError.email}</div>
          <div className="row">
            <div className="col-sm-12">
              <TextField
                placeholder="Description"
                multiline
                rows={6}
                id="description"
                label="Description"
                name="description"
                type="string"
                autoComplete="on"
                InputLabelProps={{ shrink: true }}
                error={!description}
                required
                fullWidth
                defaultValue={description}
                size="sm"
                color="primary"
                variant="outlined"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <h6 className="text-center">List of Attendees</h6>
            <div className="col-sm-12">
              <div
                className="box"
                style={{
                  border:
                    attendee?.length <= 0
                      ? "1px solid red"
                      : "1px solid lightgray",
                }}
              >
                {attendee?.map((email, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: "black",
                      borderRadius: "10px",
                      marginRight: "10px",
                      color: "white",
                      height: "25px",
                      padding: "0 20px",
                      marginBottom: "10px",
                      position: "relative",
                    }}
                  >
                    {email.email}{" "}
                    <span
                      onClick={() => removeAttendee(email.email)}
                      style={{
                        position: "absolute",
                        bottom: 5,
                        marginLeft: 5,
                        cursor: "pointer",
                      }}
                    >
                      x
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              value="Update Event"
              width={"200px"}
              onPress={update}
              backgroundColor="#1eae63"
              color="white"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEvent;
