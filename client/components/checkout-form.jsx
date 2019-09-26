import React from 'react';
import { Row, Button } from 'reactstrap';

export class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeCreditCard = this.handleChangeCreditCard.bind(this);
    this.handleChangeShippingAddress = this.handleChangeShippingAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.placeOrder(this.state);
    this.setState({
      name: '',
      course: '',
      grade: ''
    });
  }

  handleChangeName(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleChangeCreditCard(event) {
    this.setState({
      creditCard: event.target.value
    });
  }

  handleChangeShippingAddress(event) {
    this.setState({
      shippingAddress: event.target.value
    });
  }

  render() {
    var priceArray = [];
    for (var key in this.props.cart) {
      priceArray.push(this.props.cart[key]['price']);
    }
    let totalItemPrices = priceArray.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0);
    const priceTotalInDollars = '$' + ((totalItemPrices / 100).toFixed(2));
    return (
      <React.Fragment>
        <Row className="poeBanner mt-3 justify-content-center">
          <img height="100" src="/images/poeicon3.jpg" className="mt-3"></img>
          <h1 className="poeHeaderFont display-3 font-weight-bold text-center mt-4">Checkout</h1>
        </Row>
        <form onSubmit={this.handleSubmit} className="mt-5">
          <div className="row justify-content-center">
            <div className="col-sm-9 col-lg-6">
              <div className="input-group input-group-lg mt-2">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-lg">required</span>
                </div>
                <input type="text" className="form-control" onChange={this.handleChangeName} placeholder="Full Name" aria-label="Full Name" aria-describedby="inputGroup-sizing-lg" />
              </div>

              <div className="input-group input-group-lg mt-4">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-lg">required</span>
                </div>
                <input type="text" className="form-control" onChange={this.handleChangeCreditCard} placeholder="Payment Method" aria-label="Payment Method" aria-describedby="inputGroup-sizing-lg" />
              </div>

              <div className="input-group input-group-lg mt-4">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-lg">Shipping Address</span>
                </div>
                <textarea className="form-control" aria-label="Required" onChange={this.handleChangeShippingAddress} />
              </div>
              <Row className="justify-content-around">
                <Button size="sm" color="primary" onClick={() => this.props.back('catalog', {})} type="button" className="mt-5 mb-3">Continue Shopping</Button>
                <p className="text-white mt-5">Total: {priceTotalInDollars}</p>
                <Button size="sm" type="submit" color="primary" className="orderBtn mt-5">Place Order</Button>
              </Row>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
