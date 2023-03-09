import React, { useEffect, useState } from "react";
import MyNavbar from "../../components/Navbar/Navbar";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventDetail } from "../../redux/Admin/admin.actions";
import moment from "moment";
import "./Event-Detail.css";
import LoadingBox from "../../components/Loading/LoadingBox";

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
        <div className="mt-5 eventDetail">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p>
              {moment(eventDetail?.eventDate).date()}{" "}
              {moment(eventDetail?.eventDate).format("MMM")}{" "}
            </p>
            <h3>{eventDetail?.title}</h3>
          </div>
          <div className="description">
            <div className="row">
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
              {eventDetail?.attendee.map((attende) => (
                <div className="d-flex align-items-center">
                  <h6 style={{ margin: 0, marginRight: 10 }}>
                    {attende.email}
                  </h6>{" "}
                  <span>{attende.responseStatus}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetail;
