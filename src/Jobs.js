import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input } from "reactstrap";

import UserContext from "./UserContext";
import Job from "./Job";
import JoblyApi from "./api";

function Jobs() {
  const { currentUser } = useContext(UserContext);
  const [searchStr, setSearchStr] = useState("");
  const [jobs, setJobs] = useState([]);
  const [displayJobs, setDisplayJobs] = useState([]);

  useEffect(() => {
    async function getAllJobs() {
      let allJobs = await JoblyApi.getJobs();
      setJobs(allJobs);
      setDisplayJobs(allJobs);
    }
    getAllJobs();
  }, []);

  function handleChange(e) {
    const { value } = e.target;
    setSearchStr(value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const filteredList = jobs.filter((j) => {
      const jobTitle = j.title.toLowerCase();
      return jobTitle.includes(searchStr);
    });
    setDisplayJobs(filteredList);
  }

  // possible improvement: save applied jobs to cookies, scan applied jobs for jobId, set "applied" prop accordingly
  return (
    <>
      {currentUser ? (
        <div>
          <div className="searchBar form-inline d-flex justify-content-center">
            <div className="col-sm-4">
              <Form className="input-group" onSubmit={handleSubmit}>
                <Input
                  className="form-control"
                  name="searchTerm"
                  type="text"
                  value={searchStr}
                  placeholder="Enter search term"
                  onChange={handleChange}
                />
                <div className="input-group-btn">
                  <button className="btn btn-primary">Search</button>
                </div>
              </Form>
            </div>
          </div>
          {displayJobs.map((j) => {
            return (
              <Job
                jobDetails={j}
                applied={false}
                key={j.id}
              />
            );
          })}
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default Jobs;
