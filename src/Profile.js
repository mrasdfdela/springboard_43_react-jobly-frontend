import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Card, CardBody, Form, Input, Label } from "reactstrap";

import UserContext from "./UserContext";
import "./Profile.css";

function Profile({ userDetails, patchUserDetails }) {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const [formData, setFormData] = useState(userDetails);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await patchUserDetails(formData);
    } catch (err) {
      return err;
    }
    history.push("/");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      {currentUser ? (
        <div>
          <h2>Profile</h2>
          <div className="d-flex justify-content-center">
            <Card className="col-sm-4">
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Label>Username</Label>
                  <p>{formData.username}</p>
                  <Label for="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <Label for="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  <Label for="email">email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Label for="password">
                    Confirm password to make changes:
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="enter password"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <button className="btn btn-primary">Submit</button>
                </Form>
              </CardBody>
            </Card>
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default Profile;