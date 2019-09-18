import React from 'react';
import { Col } from 'reactstrap';

export class ProductListItem extends React.Component {

  render() {
    const price = '$' + ((this.props.input.price / 100).toFixed(2));
    return (
      <Col sm={{ size: 6 }} lg={{ size: 4 }} xl={{ size: 3 }}>
        <div className="card-group h-100">
          <div onClick={this.props.onClick} className="card mt-3 shadow p-3 mb-5 bg-white rounded" >
            <h5 className="card-header">{this.props.input.name}</h5>
            <img src={this.props.input.image} height="250" width="95%" className="card-img-top" alt="item image" />
            <div className="card-body">
              <h5 className="card-title">{price}</h5>
              <p className="card-text h-50">{this.props.input.shortDescription}</p>
            </div>
          </div>
        </div>
      </Col>
    );
  }

}
