import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input } from "reactstrap";
import { v4 as uuidv4 } from 'uuid';

import UserContext from "./UserContext";
import CompanyListing from "./CompanyListing";
import JoblyApi from "./api.js";

function Companies() {
  // const [displayCompanies, setDisplayCompanies] = useState([]);
  const [searchStr, setSearchStr] = useState('');
  const { currentUser } = useContext(UserContext);
  
  // let companies = [];
  // async function getAllCompanies(){
  //   let allCompanies = await JoblyApi.getCompanies();
  //   return allCompanies
  // }
  // getAllCompanies().then((success, err) => {
  //   console.log(success);
  //   companies = success;
  //   setDisplayCompanies(companies);
  // });
  
  const [companies, setCompanies] = useState([]);
  useEffect( ()=>{
    async function getAllCompanies(){
      let allCompanies = await JoblyApi.getCompanies(searchStr);
      setCompanies(allCompanies);
      // setDisplayCompanies(allCompanies);
      return allCompanies;
    }
    getAllCompanies();
  }, [searchStr]);

  function handleChange(e){
    // const { value } = e.target;
    // setSearchStr(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSearchStr(e.target[0].value);
  };

  return (
    <>
      {currentUser ? (
        <div>
          <div className="searchBar form-inline d-flex justify-content-center">
            <div className="col-sm-4 ">
              <Form className="input-group" onSubmit={handleSubmit}>
                <Input
                  className="form-control"
                  name="searchTerm"
                  type="text"
                  // value={searchStr}
                  placeholder="Enter search term"
                  onChange={handleChange}
                />
                <div className="input-group-btn">
                  <button className="btn btn-primary">Search</button>
                </div>
              </Form>
            </div>
          </div>
          {companies.map((c) => {
            return (
              <CompanyListing company={c} key={uuidv4()} />
            );
          })}
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default Companies;
