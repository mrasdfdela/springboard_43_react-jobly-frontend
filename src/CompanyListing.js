import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";

import "./CompanyListing.css";

function CompanyListing({company}) {
  let companyUrl = `/companies/${company.handle}`;
  return (
    <div className="form-inline d-flex justify-content-center">
      <div className="col-sm-8 ">
        <Card>
            <Link to={companyUrl}>
            <CardBody>
              <CardTitle tag="h5">{company.name}</CardTitle>
              <CardText>{company.description}</CardText>
              { company.logoUrl === null ? ( <div /> ) : (
                <CardImg src={company.logoUrl} alt="img" />
                )
              }
            </CardBody>
          </Link>
        </Card>      
      </div>
    </div>
  );
}

export default CompanyListing;
