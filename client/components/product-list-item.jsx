import React from 'react';
import { Col } from 'reactstrap';

export class ProductListItem extends React.Component {

  render() {
    const price = '$' + ((this.props.input.price / 100).toFixed(2));
    return (
      <Col xs={{ size: 6 }} sm={{ size: 4 }} lg={{ size: 3 }} xl={{ size: 2 }} className="mobileProductStyle cardStyling">
        <div className="card-group h-100">
          <div onClick={this.props.onClick} className="card shadow bg-dark rounded text-white" >
            <p className="card-header text-center cardHeaderStyle">{this.props.input.name}</p>
            <img src={this.props.input.image} className="zoom2 card-img-top" alt="item image" />
            <div className="card-body">
              <h6 className="card-title text-center">{price}</h6>
            </div>
          </div>
        </div>
      </Col>
    );
  }

}
