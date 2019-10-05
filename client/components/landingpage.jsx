import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

export class LandingPage extends React.Component {

  render() {
    return (
      <Container fluid="true" className="landingPage">
        <Row className="justify-content-end">
          <Col xs={{ size: 6 }}>
            <h1 className="text-white mt-5 mr-5">Path of Currency</h1>
            <h5 className="text-white">Welcome to Path of Currency, where all your Path of Exile currency
            needs can be met. Please enjoy the site!</h5>
            <Row>
              <Col>
                <Button color="secondary" onClick={() => this.props.onClick('catalog', {})}>Enter</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <p className="disclaimerText text-white"><i className="fas fa-exclamation"></i> Disclaimer: This is a demo site and not a real e-commerce store, but please enjoy your time here!</p>
      </Container>
    );
  }

}
