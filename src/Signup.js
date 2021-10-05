import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Form, Input, Label } from "reactstrap";
import "./Signup.css";

function Signup({userSignUp}) {
  const INITIAL_STATE = { 
    username: "", 
    password: "", 
    firstName:"", 
    lastName:"",
    email:"" 
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    userSignUp(formData);
    history.push("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <div class="d-flex justify-content-center">
        <Card className="col-sm-4">
          <CardBody>
            <Form className="form" onSubmit={handleSubmit}>
              <Label for="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
                onChange={handleChange}
              />
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                onChange={handleChange}
              />
              <Label for="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="first name"
                onChange={handleChange}
              />
              <Label for="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="last name"
                onChange={handleChange}
              />
              <Label for="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email"
                onChange={handleChange}
              />
              <button className="btn btn-primary">Submit</button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
