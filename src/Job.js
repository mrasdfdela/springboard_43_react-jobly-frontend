import React, { useContext, useState } from 'react';
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

import UserContext from "./UserContext";

function Job({ applied, jobDetails }) {
  const { currentUser, jobApplication } = useContext(UserContext);
  const [ jobApplied, setJobApplied] = useState(applied);

  function handleApply() {
    setJobApplied(true);
    jobApplication(currentUser, jobDetails.id);
  }
  
  return (
    <div className="form-inline d-flex justify-content-center">
      <div className="col-sm-8 ">
        <Card>
          <CardBody>
            <CardTitle>{jobDetails.title}</CardTitle>
            <CardText>Salary: {jobDetails.salary}</CardText>
            <CardText>Equity: {jobDetails.equity}</CardText>
            {jobApplied ? (
              <button className="btn btn-secondary">Applied</button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={function () {
                  handleApply();
                }}
              >
                Apply!
              </button>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Job;