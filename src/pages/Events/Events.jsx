import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import MyNavbar from "../../components/Navbar/Navbar";
import {
  deleteEvent,
  getAllEvents,
  updateSuccess,
} from "../../redux/Admin/admin.actions";
import "./Events.css";
import { TablePagination } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Events = () => {
  const [page, setPage] = useState(0);
  const [event, setEvent] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.admin?.events);
  const eventDelete = useSelector((state) => state.admin);
  const { events: allEvents, success } = eventDelete;

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteEvent = (id, eventId) => {
    dispatch(deleteEvent(eventId, id));
  };

  useEffect(() => {
    setEvent(events);
  }, [events]);

  useEffect(() => {
    setEvent(allEvents);
  }, [allEvents]);

  if (success) {
    dispatch(updateSuccess());
    toast.success("Event Deleted Successfully", {
      autoClose: 5000,
    });
  }

  return (
    <>
      <MyNavbar />

      <div className="mt-3 eventsContainer">
        <div className="mb-3 d-flex justify-content-between">
          <h3>Event</h3>
          <Link to={`/createEvent`}>
            <Button
              value="Create Event"
              width={"150px"}
              backgroundColor="#1eae63"
              color="white"
            />
          </Link>
        </div>
        <div className="events">
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              table-layout="fixed"
            >
              <TableHead>
                <TableRow>
                  <TableCell white-space="nowrap">Title</TableCell>
                  <TableCell white-space="nowrap">Description</TableCell>
                  <TableCell white-space="nowrap">Venue</TableCell>
                  <TableCell align="right" white-space="nowrap">
                    StartTime
                  </TableCell>
                  <TableCell align="right" white-space="nowrap">
                    EndTime
                  </TableCell>
                  <TableCell align="right" white-space="nowrap" component="div">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {event
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((event) => (
                    <TableRow
                      // component={Link}
                      // to={`/event/${event.id}`}
                      key={event.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Link to={`/event/${event.id}`}>{event.title}</Link>
                      </TableCell>
                      <TableCell white-space="nowrap">
                        <Link to={`/event/${event.id}`}>
                          {event.description.substring(0, 20)}{" "}
                          {event.description.length > 20 ? "... " : ""}
                        </Link>
                      </TableCell>
                      <TableCell white-space="nowrap">
                        <Link to={`/event/${event.id}`}>{event.venue}</Link>
                      </TableCell>
                      <TableCell align="right" white-space="nowrap">
                        <Link to={`/event/${event.id}`}>
                          {moment(event.eventDate).format("DD-MM-YYYY")}{" "}
                          {event.eventStartTime}
                        </Link>
                      </TableCell>
                      <TableCell align="right" white-space="nowrap">
                        <Link to={`/event/${event.id}`}>
                          {moment(event.eventDate).format("DD-MM-YYYY")}{" "}
                          {event.eventEndTime}
                        </Link>
                      </TableCell>
                      <TableCell align="right" white-space="nowrap">
                        <Link to={`/editEvent/${event.id}`} state={{ event }}>
                          <EditIcon />
                        </Link>
                        <span style={{ cursor: "pointer", marginLeft: "5px" }}>
                          <DeleteIcon
                            onClick={() =>
                              handleDeleteEvent(event.id, event.eventId)
                            }
                          />
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 15, 25]}
            component="div"
            count={event?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default Events;
