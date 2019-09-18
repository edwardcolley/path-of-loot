import React from 'react';
import { CartSummaryItem } from './cart-summary-item';
import { Container, Row, Button } from 'reactstrap';

export class CartSummary extends React.Component {

  renderCart() {
    return this.props.cart.map((input, key) => {
      return (
        <CartSummaryItem delete={this.props.delete} key={key} input={input}/>
      );
    });
  }

  render() {
    if (this.props.cart.length === 0) {
      return (
        <React.Fragment>
          <Row className="poeBanner mt-3 justify-content-center">
            <img height="100" src="/images/poeicon3.jpg" className="mt-3"></img>
            <h1 className="poeHeaderFont display-3 font-weight-bold text-center mt-4">My Cart</h1>
          </Row>
          <Row className="justify-content-around">
            <Button color="secondary" onClick={() => this.props.back('catalog', {})} type="button" className="mt-5 mb-3">Back</Button>
            <h2 className="text-white mt-5">You have no items in your cart.</h2>
            <h2 className="text-white mt-5">Total: $0.00</h2>
          </Row>
        </React.Fragment>
      );
    } else {
      const totalItemPrices = this.props.cart.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.price), 0);
      const priceTotalInDollars = '$' + ((totalItemPrices / 100).toFixed(2));
      return (
        <React.Fragment>
          <Row className="poeBanner mt-3 justify-content-center">
            <img height="100" src="/images/poeicon3.jpg" className="mt-3"></img>
            <h1 className="poeHeaderFont display-3 font-weight-bold text-center mt-4">My Cart</h1>
          </Row>
          <Container>
            <Row className="justify-content-around">
              <Button color="secondary" onClick={() => this.props.back('catalog', {})} type="button" className="mt-5 mb-3">Back</Button>
              <h2 className="mt-5 text-white">Total: {priceTotalInDollars}</h2>
              {this.props.cart.length > 0 &&
               <Button color="primary" onClick={() => this.props.back('checkout', {})} type="button" className="mt-5 mb-3">Checkout</Button>
              }
            </Row>
            <Row className="justify-content-center">
              {this.renderCart()}
            </Row>
          </Container>
        </React.Fragment>
      );

    }
  }
}
