import React, {useContext} from "react";
import UserContext from "./UserContext";
import { Link } from "react-router-dom";
// import { Button } from "reactstrap";

function Home(){
  const {currentUser} = useContext(UserContext);
  return (
    <>
      <h3>Jobly</h3>
      <p>All the jobs in one, convenient place.</p>
      {currentUser === null ? (
        <div>
          <Link className="btn btn-primary" to="./login">Login</Link>
          <Link className="btn btn-primary" to="./signup">Sign Up</Link>
        </div>
      ) : (
        <p>Welcome Back!</p>        
      )
    }
    </>
  );
}

export default Home;