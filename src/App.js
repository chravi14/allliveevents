import './App.css';
import Navbar from './components/Navbar';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Sports from './pages/Sports';
import Wedding from './pages/Wedding';

function App() {
  return (
    <div className="main-container">
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/home" exact><Home /></Route>
          <Route path="/sports" exact><Sports /></Route>
          <Route path="/wedding" exact><Wedding /></Route>
          <Redirect path="/" to="/home"></Redirect>
        </Switch>
      </div>
    </div>
  );
}

export default App;
