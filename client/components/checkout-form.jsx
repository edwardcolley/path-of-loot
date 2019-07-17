import React from 'react';

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
    const totalItemPrices = this.props.cart.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.price), 0);
    const priceTotalInDollars = '$' + ((totalItemPrices / 100).toFixed(2));
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h1 className="display-2 mt-3">Checkout</h1>
            <p className="text-muted">Total: {priceTotalInDollars}</p>
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
          </div>
        </div>
        <div className="row justify-content-around mt-5">
          <div className="col-2">
            <button onClick={() => this.props.back('catalog', {})} type="button" className="btn btn-link">Continue Shopping</button>
          </div>
          <div className="col-1">
            <button type="submit" className="btn btn-primary">Place Order</button>
          </div>
        </div>
      </form>
    );
  }
}
