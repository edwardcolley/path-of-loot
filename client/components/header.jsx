import React from 'react';
import { Row } from 'reactstrap';

export class Header extends React.Component {

  render() {
    return (
      <Row className="poeBanner mt-3 justify-content-center">
        <img height="100" src="/images/poeicon3.jpg" className="mt-3"></img>
        <h1 className="poeHeaderFont display-3 font-weight-bold text-center mt-4">Path of Trading</h1>
      </Row>
    );
  }

}
