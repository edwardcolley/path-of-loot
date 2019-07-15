import React from 'react';
import { CartSummaryItem } from './cart-summary-item';

export class CartSummary extends React.Component {

  renderCart() {
    return this.props.cart.map(input => {
      return (
        <CartSummaryItem key={input.id} input={input}/>
      );
    });
  }

  render() {
    if (!this.props.cart) {
      return <h1 className="display-2">You have no items in your cart.</h1>;
    } else {
      const totalItemPrices = this.props.cart.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
      const priceTotalInDollars = '$' + ((totalItemPrices / 100).toFixed(2));
      return (
        <div>
          <div className="row">
            <div className="col">
              <button onClick={() => this.props.back('catalog', {})} type="button" className="btn btn-outline-secondary mb-2 ml-5">Back</button>
              <h1 className="display-4 ml-5 mb-4">My Cart</h1>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row justify-content-center">
              {this.renderCart()}
            </div>
            <div className="row">
              <h2 className="display-4 ml-5">Total: {priceTotalInDollars}</h2>
            </div>
          </div>
        </div>
      );

    }
  }
}
