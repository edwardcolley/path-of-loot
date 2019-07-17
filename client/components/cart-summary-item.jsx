import React from 'react';

export class CartSummaryItem extends React.Component {

  render() {
    const price = '$' + ((this.props.input.price / 100).toFixed(2));
    return (
      <div className="card flex-row flex-wrap h-25 w-75 mb-3">
        <div className="card-header border-0">
          <img height="200" width="200"src={this.props.input.image} alt="item image" />
        </div>
        <div className="card-block px-2">
          <h2 className="card-title mt-4 ml-4">{this.props.input.name}</h2>
          <h2 className="ml-4 mt-1"><span className="badge badge-info">{price}</span></h2>
          <p className="card-text ml-4 mt-4">{this.props.input.shortDescription}</p>
        </div>
      </div>
    );
  }

}
