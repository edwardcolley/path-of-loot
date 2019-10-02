import React from 'react';
import { Col } from 'reactstrap';

export class ProductListItem extends React.Component {

  render() {
    const price = '$' + ((this.props.input.price / 100).toFixed(2));
    return (
      <Col sm={{ size: 4 }} lg={{ size: 3 }} xl={{ size: 2 }} className=" cardStyling">
        <div className="card-group h-50">
          <div onClick={this.props.onClick} className="card shadow bg-dark rounded text-white" >
            <p className="card-header text-center cardHeaderStyle">{this.props.input.name}</p>
            <img src={this.props.input.image} height="150" width="95%" className="card-img-top" alt="item image" />
            <div className="card-body">
              <h6 className="card-title text-center">{price}</h6>
              {/* <p className="card-text h-50">{this.props.input.shortDescription}</p> */}
            </div>
          </div>
        </div>
      </Col>
    );
  }

}
