import { Redirect, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Paramus from './pages/Paramus/Paramus';
import Admin from './pages/Admin';
import Dashboard from './pages/Admin/Dashboard';
import Events from './pages/Events/Events';
import Tournaments from './pages/Tournaments/Tournaments';
import Navbar from './components/Navbar';
import './App.css';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="main-container">
        <Navbar />
        <div className="container">
          <Switch>
            <Route path="/home" exact><Home /></Route>
            <Route path="/tournaments" exact><Tournaments /></Route>
            <Route path="/paramus" exact><Paramus /></Route>
            <Route path="/events" exact><Events /></Route>
            <Route path="/admin" exact><Admin /></Route>
            <Route path="/dashboard" exact><Dashboard /></Route>
            <Redirect path="/" to="/home"></Redirect>
          </Switch>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
