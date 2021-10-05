import React, {useContext, useEffect, useState} from "react";
import { Redirect, useParams } from "react-router-dom";

import UserContext from "./UserContext";
import Job from './Job';
import JoblyApi from "./api";

function Company() {
  const { currentUser } = useContext(UserContext);
  const { handle } = useParams();
  const [company, setCompany] = useState({jobs:[]});

  useEffect( ()=> {
    async function getCompanyDetails(){
      let companyDetails = await JoblyApi.getCompany(handle);
      setCompany(companyDetails);
    }
    getCompanyDetails();
  },[handle])

  return (
    <>
      {currentUser ? (
        <div className="form-inline d-flex justify-content-center">
          <div className="col-sm-6">
            <h1>{company.name}</h1>
            <p>{company.description}</p>
            {company.jobs.map((j) => {
              return <Job jobDetails={j} />;
            })}
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default Company;
