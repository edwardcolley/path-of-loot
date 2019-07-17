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
    if (this.props.cart.length === 0) {
      return (
        <div>
          <h1 className="display-3">You have no items in your cart.</h1>
          <h1 className="display-4">Total: $0.00</h1>
        </div>
      );
    } else {
      const totalItemPrices = this.props.cart.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.price), 0);
      const priceTotalInDollars = '$' + ((totalItemPrices / 100).toFixed(2));
      return (
        <div>
          <div className="row justify-content-start">
            <div className="col-lg-1"></div>
            <div className="col-lg-2">
              <button onClick={() => this.props.back('catalog', {})} type="button" className="btn btn-outline-secondary mb-2 ml-5">Back</button>
              <h1 className="display-4 ml-5 mb-4">My Cart</h1>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row justify-content-center">
              {this.renderCart()}
            </div>
            <div className="row justify-content-around">
              <div className="col-lg-3">
                <h2 className="display-4 ml-5">Total: {priceTotalInDollars}</h2>
              </div>
              <div className="col-lg-1">
                {this.props.cart.length > 0 &&
                <button onClick={() => this.props.back('checkout', {})} type="button" className="btn btn-outline-primary btn-lg">Checkout</button>
                }
              </div>
            </div>
          </div>
        </div>
      );

    }
  }
}
