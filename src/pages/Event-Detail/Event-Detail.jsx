import React, { useEffect, useState } from "react";
import MyNavbar from "../../components/Navbar/Navbar";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventDetail } from "../../redux/Admin/admin.actions";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";
import "./Event-Detail.css";
import LoadingBox from "../../components/Loading/LoadingBox";
import Status from "../../components/Status/status";

const EventDetail = () => {
  const dispatch = useDispatch();
  let { id } = useParams();

  const [loading, setLoading] = useState(true);

  const eventDetail = useSelector((state) => state.admin.event);

  useEffect(() => {
    if (eventDetail) {
      setLoading(false);
    }
  }, [eventDetail]);

  useEffect(() => {
    dispatch(getEventDetail(id));
  }, [id]);
  return (
    <>
      <MyNavbar />

      {loading ? (
        <div className="mt-5 container">
          <LoadingBox />
        </div>
      ) : (
        <div className=" eventDetail">
          {/* <div className="d-flex flex-column justify-content-center align-items-center">
            <p>
              {moment(eventDetail?.eventDate).date()}{" "}
              {moment(eventDetail?.eventDate).format("MMM")}{" "}
            </p>
            <h3>{eventDetail?.title}</h3>
          </div>
          <div className="description">
            <div className="row desc">
              <div className="col-md-7">
                <h4>DESCRIPTION</h4>
                <p>{eventDetail?.description}</p>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-4 d-flex flex-column justify-content-between">
                <div className="d-flex flex-column">
                  <h4>DATE AND TIME</h4>
                  <span>
                    {moment(eventDetail?.eventDate).format("ddd")}
                    {", "}
                    {moment(eventDetail?.eventDate).date()}{" "}
                    {moment(eventDetail?.eventDate).format("MMMM")}
                    {", "}
                    {moment(eventDetail?.eventDate).year()}
                  </span>
                  <span>
                    {eventDetail?.eventStartTime} {" - "}{" "}
                    {eventDetail?.eventEndTime}
                  </span>
                </div>
                <div>
                  <h4>LOCATION</h4>
                  <p>{eventDetail?.venue}</p>
                </div>
                <div>
                  <h4>EVENT DEADLINE</h4>
                  <p>
                    {moment(eventDetail?.registrationDeadline).format("ddd")}
                    {", "}
                    {moment(eventDetail?.registrationDeadline).date()}{" "}
                    {moment(eventDetail?.registrationDeadline).format("MMMM")}
                    {", "}
                    {moment(eventDetail?.registrationDeadline).year()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="attendees">
            <div className="row">
              <h4>ATTENDEE</h4>
              {eventDetail?.attendee?.map((attende) => (
                <div className="d-flex align-items-center">
                  <h6 style={{ margin: 0, marginRight: 10 }}>
                    {attende.email}
                  </h6>{" "}
                  <span>{attende.responseStatus}</span>
                </div>
              ))}
            </div>
          </div> */}
          <img
            src="https://www.nationalconferencecentre.co.uk/wp-content/uploads/2022/01/charity-fullwidth-scaled.jpeg"
            alt=""
            style={{ height: "200px", width: "100%", objectFit: "cover" }}
          />
          <div
            className="box1 shadow rounded bg-white p-3"
            style={{ marginTop: "-50px", position: "relative" }}
          >
            <h1>{eventDetail?.title}</h1>
            <p>{eventDetail?.description}</p>
          </div>

          <div className="box1 shadow rounded bg-white p-3 mt-3">
            <>
              <div className="d-flex">
                <div className="w-50 d-flex flex-column">
                  <h4>Venue</h4>
                  <p className="d-flex align-items-center">
                    <LocationOnIcon
                      style={{ color: "green", marginRight: "10px" }}
                    />
                    {eventDetail?.venue}
                  </p>
                </div>
                <div className="w-50 d-flex flex-column">
                  <h4>Registration Deadline</h4>
                  <p className="d-flex align-items-center">
                    <AccessTimeIcon
                      style={{ color: "green", marginRight: "10px" }}
                    />
                    {moment(eventDetail?.registrationDeadline).format("ddd")}
                    {", "}
                    {moment(eventDetail?.registrationDeadline).date()}
                    {"  "}
                    {moment(eventDetail?.registrationDeadline).format("MMMM")}
                    {", "}
                    {moment(eventDetail?.registrationDeadline).year()}{" "}
                    {moment(eventDetail?.registrationDeadline).format(
                      "hh:mm A"
                    )}
                  </p>
                </div>
              </div>

              <div className="line"></div>
            </>
            <div className="d-flex mt-3">
              <div className="w-50 d-flex flex-column">
                <h4>Date</h4>
                <p className="d-flex align-items-center">
                  <CalendarMonthIcon
                    style={{ color: "green", marginRight: "10px" }}
                  />
                  {moment(eventDetail?.eventDate).format("ddd")}
                  {", "}
                  {moment(eventDetail?.eventDate).date()}{" "}
                  {moment(eventDetail?.eventDate).format("MMMM")}
                  {", "}
                  {moment(eventDetail?.eventDate).year()}
                </p>
              </div>
              <div className="w-50 d-flex flex-column">
                <h4>Time</h4>
                <p className="d-flex align-items-center">
                  <AccessTimeIcon
                    style={{ color: "green", marginRight: "10px" }}
                  />
                  {eventDetail?.eventStartTime} {" - "}{" "}
                  {eventDetail?.eventEndTime}
                </p>
              </div>
            </div>
          </div>

          <div className="box1 shadow rounded bg-white p-3 mt-3">
            <div className="d-flex">
              <h4 className="w-50">Attendees</h4>
              <div className="d-flex w-50">
                <Status title={"Accepted"} color={"green"} />
                <Status title={"needsAction"} color={"orange"} />
                <Status title={"cancelled"} color={"red"} />
              </div>
            </div>
            {eventDetail?.attendee?.map((attende) => (
              <div className="d-flex align-items-center">
                <h6
                  style={{
                    margin: 0,
                    marginRight: 10,
                    color:
                      attende.responseStatus === "accepted"
                        ? "green"
                        : attende.responseStatus === "needsAction"
                        ? "orange"
                        : "red",
                  }}
                >
                  <EmailIcon
                    style={{
                      marginRight: "10px",
                      marginTop: "-2px",
                    }}
                  />{" "}
                  {attende.email}
                </h6>{" "}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetail;
