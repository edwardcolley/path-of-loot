import React from 'react';
import { Button, Row, Col } from 'reactstrap';

export class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      removed: false
    };

    this.findImage = this.findImage.bind(this);
  }

  deleteItem() {
    this.setState({
      removed: true
    });
    this.props.delete(this.props.input);
  }

  findImage() {
    if (!this.props.input.image) {
      return this.props.input.images[0];
    } else {
      return this.props.input.image;
    }
  }

  render() {
    console.log('cart-summary-item loaded');
    const price = '$' + ((this.props.input.price / 100).toFixed(2));
    return (
      <React.Fragment>
        {this.state.removed === false &&
        <div className="card flex-row flex-wrap h-50 w-75 mb-3 shadow">
          <div className="card-header w-25 border-0">
            <img height="200" width="200"src={this.findImage()} alt="item image" />
          </div>
          <div className="card-block w-75 px-2">
            <Row className="justify-content-end mr-2 mt-2">
              <Button color="secondary" onClick={() => this.deleteItem()}>Remove</Button>
            </Row>
            <Row>
              <Col xs={{ size: 6, offset: 4 }} sm={{ size: 8, offset: 4 }} lg={{ size: 10, offset: 1 }}>
                <h3 className="card-title mt-4 ml-4">{this.props.input.name}</h3>
                <h3 className="ml-4 mt-1"><span className="badge badge-info">{price}</span></h3>
                <p className="card-text ml-4 mt-4 mb-2">{this.props.input.shortDescription}</p>
              </Col>
            </Row>
          </div>
        </div>}
        {this.state.removed === true &&
        <div></div>}
      </React.Fragment>
    );
  }

}
