import { Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Events from "./pages/Events/Events";
import SignIn from "./pages/Auth/Sign-in";
import Error404 from "./pages/Error/Error404";
import EventDetail from "./pages/Event-Detail/Event-Detail";
import CreateEvent from "./pages/Create/Create";
import EditEvent from "./pages/Edit/Edit";

function App() {
  const user = useSelector((state) => state.login?.userInfo?.user);

  return (
    <>
      {!user && <Navigate to="/login" />}
      <Routes>
        <Route path="/login" element={<SignIn />} />
        {user && (
          <>
            <Route path="/" element={<Events />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/createEvent" element={<CreateEvent />} />
            <Route path="/editEvent/:id" element={<EditEvent />} />
          </>
        )}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
