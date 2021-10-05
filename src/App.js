import React, {useEffect, useState} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import UserContext from "./UserContext";
import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Companies from "./Companies";
import Company from "./Company";
import Jobs from "./Jobs";

import './App.css';
import JoblyApi from "./api.js";

function App() {
  const [currentUser,setCurrentUser] = useState(null);
  const [currentToken,setCurrentToken] = useState(null);
  const [currentApps, setCurrentApps] = useState([]);
  // const history = useHistory();

  useEffect( ()=>{
    // on startup/refresh, save localStorage token & username to app states
    const token = localStorage.getItem("currentToken");
    const user = localStorage.getItem("currentUser");
    if (token) {
      JoblyApi.token = token;
      setCurrentUser(user);
      setCurrentToken(token);
    }
  },[]);

  useEffect(() => {
    // when a currentToken is updated, the currentUser and currentToken are saved to localStorage
    if (currentUser) {
      localStorage.setItem("currentUser", currentUser);
      localStorage.setItem("currentToken", currentToken);
    } else {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("currentToken");
    }
  }, [currentToken, currentUser]);

  async function userSignUp(formData) {
    try {
      const newToken = await JoblyApi.registerUser(formData);
      setCurrentUser(formData.username);
      setCurrentToken(newToken);
      // history.push("/");
    } catch {
      console.log('...user not registered...')
    }
  }
  async function userLogin(username,password) {
    try {
      const newToken = await JoblyApi.authenticateUser(username, password);
      setCurrentUser(username);
      setCurrentToken(newToken);
      // history.push("/");
    } catch {
      console.log("...user not stored in session...")
    }
  }
  function userLogout(){
    setCurrentUser(null);
    JoblyApi.token = null;
    setCurrentToken(JoblyApi.token);
  }

  function getUserDetails() {
    return JoblyApi.getUser(currentUser);
  }
  function patchUserDetails(formData) {
    return JoblyApi.patchUser(formData);
  }

  async function jobApplication(username,jobId){
    const newApp = await JoblyApi.applyForJob(username,jobId);
    console.log(newApp)
    if (!newApp.applied) {
      // possible improvement: save new job application to cookies. Reference cookies at startup to set list of "applied to" jobs
      setCurrentApps([...currentApps, jobId])
    }
  }

  return (
    <UserContext.Provider
      value={{
        currentUser: currentUser,
        currentToken: currentToken,
        currentApps: currentApps,
        jobApplication: jobApplication
      }}
    >
      <div className="App">
        <BrowserRouter>
          <NavBar userLogout={userLogout} />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login userLogin={userLogin} />
            </Route>
            <Route exact path="/signup">
              <Signup userSignUp={userSignUp} />
            </Route>
            <Route exact path="/profile">
              <Profile
                getUserDetails={getUserDetails}
                patchUserDetails={patchUserDetails}
              />
            </Route>
            <Route exact path="/companies">
              <Companies />
            </Route>
            <Route exact path="/companies/:handle">
              <Company />
            </Route>
            <Route exact path="/jobs">
              <Jobs />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
