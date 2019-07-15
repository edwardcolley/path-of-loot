import React from 'react';

export class CartSummaryItem extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="col-2">
          <img src={this.props.cart[0].image} alt="item image"/>
        </div>
        <div className="col-9"></div>
      </div>
    );
  }

}
