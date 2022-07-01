import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth } from './auth/AuthContext';
import HomePage from './views/home/HomePage';
import LoginPage from './views/login/LoginPage';
import SignupPage from './views/signup/SignupPage';

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route exact path="/dashboard">
          <div>Dashboard</div>
        </Route>
        <Route exact path="/login">
          <LoginPage/>
        </Route>
        <Route exact path="/signup">
          <SignupPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
