import React from 'react';
import { Row, Button, Col, Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';

export class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: '',
      modal: false
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeCreditCard = this.handleChangeCreditCard.bind(this);
    this.handleChangeShippingAddress = this.handleChangeShippingAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleSubmit = this.toggleSubmit.bind(this);
    this.validateNumber = this.validateNumber.bind(this);
  }

  handleSubmit(event) {
    // event.preventDefault();
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

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleSubmit() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.handleSubmit();
  }

  validateNumber() {
    var ccNum = document.getElementById('Num').value;
    var name = document.getElementById('Name').value;
    var cardRegEx = /[0-9]{4,4}-[0-9]{4,4}-[0-9]{4,4}-[0-9]{4,4}/;
    var nameRegEx = /[a-zA-z]{2,40}/;
    var isCardValid = false;
    var isNameValid = false;

    if (cardRegEx.test(ccNum)) {
      isCardValid = true;
    }
    if (nameRegEx.test(name)) {
      isNameValid = true;
    }

    if (isCardValid && isNameValid) {
      this.toggle();
    }
    if (!isNameValid) {
      alert('Please provide a name');
    }
    if (!isCardValid) {
      alert('Please provide a card number: ****-****-****-****');
    }
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
        <Row>
          <Col xs={{ size: 8, offset: 2 }} className="productBackground">
            <Row className="poeBanner mt-3 justify-content-center">
              <h1 className="poeHeaderFont display-3 font-weight-bold text-center mt-4">Checkout</h1>
            </Row>
            <form onSubmit={this.handleSubmit}>
              <Row className="justify-content-around">
                <Button size="sm" color="primary ml-5" onClick={() => this.props.back('catalog', {})} type="button" className="mobileFont mt-5 mb-3">Continue Shopping</Button>
                <h2 className="mobileFontHeader text-white mt-5">Total: {priceTotalInDollars}</h2>
                <Button size="sm" onClick={this.validateNumber} color="primary" className="mobileFont orderBtn mt-5 mr-5">Place Order</Button>
              </Row>
              <div className="row justify-content-center">
                <div className="col-xs-4 col-lg-9">
                  <div className="input-group input-group-lg mt-2">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroup-sizing-lg">required</span>
                    </div>
                    <input type="text" id="Name" className="form-control" onChange={this.handleChangeName} placeholder="Full Name" aria-label="Full Name" aria-describedby="inputGroup-sizing-lg" />
                  </div>

                  <div className="input-group input-group-lg mt-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroup-sizing-lg">required</span>
                    </div>

                    <input type="text" name="Number" id="Num" className="form-control" onChange={this.handleChangeCreditCard} placeholder="Payment Method" aria-label="Payment Method" aria-describedby="inputGroup-sizing-lg" />
                  </div>

                  <div className="input-group input-group-lg mt-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroup-sizing-lg">Address</span>
                    </div>
                    <textarea className="form-control" aria-label="Required" onChange={this.handleChangeShippingAddress} />
                  </div>
                  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                      <p>Thank you! No purchase has been processed</p>
                      <p>Name: {this.state.name}</p>
                      <p>Payment: {this.state.creditCard}</p>
                      <p>Address: {this.state.shippingAddress}</p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggleSubmit}>Close</Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
