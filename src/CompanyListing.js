import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";

function CompanyListing({company}) {
  let companyUrl = `/companies/${company.handle}`;
  return (
    <Link to={companyUrl}>
      <Card>
        <CardBody>
          <CardTitle tag="h5">{company.name}</CardTitle>
          <CardText>{company.description}</CardText>
          <CardImg src={company.logUrl} alt="<missing img>" />
        </CardBody>
      </Card>
    </Link>
  );
}

export default CompanyListing;
