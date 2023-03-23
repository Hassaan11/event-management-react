import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import MessageBox from "../../components/MessageBox/MessageBox";
import MyNavbar from "../../components/Navbar/Navbar";
import { createNewEvent, updateSuccess } from "../../redux/Admin/admin.actions";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import "./Create.css";

const CreateEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [email, setEmail] = useState("");
  const [attendee, setAttendee] = useState([]);
  const [EmailError, setEmailError] = useState({});

  const newEvent = useSelector((state) => state.admin);
  const { createdEvent, success } = newEvent;

  if (success) {
    toast.success("Event Created Successfully", {
      autoClose: 5000,
    });
    dispatch(updateSuccess());

    setTimeout(() => navigate(`/event/${createdEvent?.id}`), 2000);
  }

  const validateEmail = (e) => {
    let errors = {};
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
  const createEvent = () => {
    console.log("req");

    if (
      !title ||
      !description ||
      !venue ||
      !date ||
      !startTime ||
      !endTime ||
      !registrationDeadline
    ) {
      toast.error("Please Fill the Required Fields", {
        autoClose: 5000,
      });
    } else {
      dispatch(
        createNewEvent(
          title,
          description,
          venue,
          date,
          startTime,
          endTime,
          registrationDeadline,
          attendee
        )
      );
    }
  };
  return (
    <>
      <MyNavbar />
      {/* <ToastContainer /> */}
      <div className="mt-3 createEventContainer">
        <h3 className="text-center mb-3">Create Event</h3>

        <div className="input-fields">
          <div className="row">
            {success && (
              <MessageBox variant="success">
                Event Created Successfully
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
                    attendee.length <= 0
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
              value="Create Event"
              width={"200px"}
              onPress={createEvent}
              backgroundColor="#1eae63"
              color="white"
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateEvent;

// Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum modi non incidunt, quo magnam pariatur ullam voluptas consequatur! Quis facilis consectetur harum laborum unde quisquam animi dolore mollitia expedita cupiditate.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum modi non incidunt, quo magnam pariatur ullam voluptas consequatur! Quis facilis consectetur harum laborum unde quisquam animi dolore mollitia expedita cupiditate.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum modi non incidunt, quo magnam pariatur ullam voluptas consequatur! Quis facilis consectetur harum laborum unde quisquam animi dolore mollitia expedita cupiditate.
