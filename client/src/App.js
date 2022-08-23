import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth } from './auth/AuthContext';
import HomePage from './views/home/HomePage';
import LoginPage from './views/login/LoginPage';
import SignupPage from './views/signup/SignupPage';
import DashboardPage from './views/dashboard/DashboardPage';
import { ProtectedLoggedInRoute, ProtectedLoggedOutRoute } from './components/ProtectedRoute';
import { getUser } from './util/userHandler';
import { useEffect } from 'react';
import { ProjectPage } from './views/project/ProjectPage';

function App() {
  const { token, user, setUser } = useAuth();

  useEffect(() => {
    const myUser = getUser({token: token});
    myUser.then(value => {
        setUser(value);
      }).catch(err => {
        console.log(err)
      });
}, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route exact path="/dashboard">
          <ProtectedLoggedOutRoute route={<DashboardPage/>} alternateRoute="/login"/>
        </Route>
        <Route exact path="/login">
          <ProtectedLoggedInRoute route={<LoginPage/>} alternateRoute="/dashboard"/>
        </Route>
        <Route exact path="/signup">
          <ProtectedLoggedInRoute route={<SignupPage/>} alternateRoute="/dashboard"/>
        </Route>
        <Route exact path="/project/:id">
          <ProjectPage token={token}/>
        </Route>
        <Route exact path="/ticket/:id">
          <SignupPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
