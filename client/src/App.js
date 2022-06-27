import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth } from './auth/AuthContext';

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>Home</div>
        </Route>
        <Route exact path="/dashboard">
          <div>Dashboard</div>
        </Route>
        <Route exact path="/login">
          <div>login</div>
        </Route>
        <Route exact path="/signup">
          <div>Signup</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
