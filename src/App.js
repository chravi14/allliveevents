import './App.css';
import Navbar from './components/Navbar';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Sports from './pages/Sports';
import Paramus from './pages/Paramus';
import Wedding from './pages/Wedding';
import Admin from './pages/Admin';
import Dashboard from './pages/Admin/Dashboard';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="main-container">
        <Navbar />
        <div className="container">
          <Switch>
            <Route path="/home" exact><Home /></Route>
            <Route path="/tournaments" exact><Sports /></Route>
            <Route path="/paramus" exact><Paramus /></Route>
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
