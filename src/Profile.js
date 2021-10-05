import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Button, Card, CardBody, Form, Input, Label } from "reactstrap";

import UserContext from "./UserContext";
import "./Profile.css";

function Profile({ getUserDetails, patchUserDetails }) {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    async function fillFormData(){
      const u = await getUserDetails();
      setFormData({
        username: u.username,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email
      });
    }
    fillFormData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const resp = await patchUserDetails(formData);
      setFormData({
        username: resp.username,
        firstName: resp.firstName,
        lastName: resp.lastName,
        email: resp.email,
        password: ""
      });
    } catch(err) {
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
                    onChange={handleChange}
                  />
                  <Button className="btn-primary">Submit</Button>
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