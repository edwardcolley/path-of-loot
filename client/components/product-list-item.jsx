import React from 'react';
import { Col } from 'reactstrap';

export class ProductListItem extends React.Component {

  render() {
    const price = '$' + ((this.props.input.price / 100).toFixed(2));
    return (
      <Col sm={{ size: 4 }} lg={{ size: 3 }} xl={{ size: 2 }} className=" cardStyling">
        <div className="card-group h-50">
          <div onClick={this.props.onClick} className="card shadow bg-dark rounded text-white" >
            <h6 className="card-header text-center">{this.props.input.name}</h6>
            <img src={this.props.input.image} height="150" width="95%" className="card-img-top" alt="item image" />
            <div className="card-body">
              <h5 className="card-title">{price}</h5>
              {/* <p className="card-text h-50">{this.props.input.shortDescription}</p> */}
            </div>
          </div>
        </div>
      </Col>
    );
  }

}
