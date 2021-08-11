import { Redirect, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Paramus from "./pages/Paramus/Paramus";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Admin/Dashboard";
import Events from "./pages/Events/Events";
import Tournaments from "./pages/Tournaments/Tournaments";
import Navbar from "./components/Navbar";
import "./App.css";

import { AuthProvider } from "./context/AuthContext";
import EventHoc from "./pages/EventHoc";

function App() {
  return (
    <AuthProvider>
      <div className="main-container">
        <Navbar />
        <div className="container">
          <Switch>
            <Route path="/home" exact>
              <Home />
            </Route>
            <Route path="/tournaments">
              <EventHoc title="Tournaments" category="tournaments" />
            </Route>
            <Route path="/meetings">
              <EventHoc title="Meetings" category="meetings" />
            </Route>
            <Route path="/schools">
              <EventHoc title="School Events" category="schools" />
            </Route>
            <Route path="/events">
              <EventHoc title="Events" category="events" />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Redirect path="/" to="/home"></Redirect>
          </Switch>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
