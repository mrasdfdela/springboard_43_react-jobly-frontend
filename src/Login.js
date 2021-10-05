import React, {useContext, useState} from "react";
import UserContext from "./UserContext";
import { Redirect } from "react-router-dom";
import { Card, CardBody, Form, Input, Label } from "reactstrap";

import "./Login.css";

function Login({userLogin}) {
  const {currentUser} = useContext(UserContext);
  const INITIAL_STATE = { username: "", password: "" }
  const [ formData, setFormData ] = useState(INITIAL_STATE);
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    const {username, password} = formData;
    userLogin(username, password);
  }

  const handleChange = (e)=> {
    const {name,value} = e.target;
    setFormData({...formData, [name]: value});
  }

  return (
    <div>
      {currentUser === null ? (
        <div>
          <h2>Log In</h2>
          <div className="d-flex justify-content-center">
            <Card className="col-sm-4">
              <CardBody>
                <Form className="form" onSubmit={handleSubmit}>
                  <Label for="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="username"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <Label for="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="password"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <button className="btn btn-primary">Login</button>
                </Form>
              </CardBody>
            </Card>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

export default Login;
