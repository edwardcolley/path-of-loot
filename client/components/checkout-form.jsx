import React from 'react';
import { Row, Button, Col, Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';

export class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: '',
      modal: false,
      warningModal: false,
      warningStatement: ''
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeCreditCard = this.handleChangeCreditCard.bind(this);
    this.handleChangeShippingAddress = this.handleChangeShippingAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleSubmit = this.toggleSubmit.bind(this);
    this.validateNumber = this.validateNumber.bind(this);
    this.toggleWarning = this.toggleWarning.bind(this);
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

  toggleWarning() {
    this.setState(prevState => ({
      warningModal: !prevState.warningModal
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
    var address = document.getElementById('Address').value;
    var cardRegEx = /[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}/;
    var nameRegEx = /[a-zA-z_\s]{2,40}/;
    var addressRegEx = /^[0-9_\s]+[a-zA-Z0-9_\s\r\n.,]+[0-9]{5}$/;
    var isCardValid = false;
    var isNameValid = false;
    var isAddressValid = false;

    if (cardRegEx.test(ccNum)) {
      isCardValid = true;
    }
    if (nameRegEx.test(name)) {
      isNameValid = true;
    }

    if (addressRegEx.test(address)) {
      isAddressValid = true;
    }

    if (isCardValid && isNameValid && isAddressValid) {
      this.toggle();
    } else if (!isNameValid) {
      this.setState({
        warningStatement: 'Please provide your name'
      });
      this.toggleWarning();
    } else if (!isCardValid) {
      this.setState({
        warningStatement: 'Please provide a card number: ****-****-****-****'
      });
      this.toggleWarning();
    } else if (!isAddressValid) {
      this.setState({
        warningStatement: 'Please provide a valid shipping address'
      });
      this.toggleWarning();
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
          <Col xs={{ size: 10, offset: 1 }} className="checkoutBackground">
            <Row className="poeBanner mt-3 justify-content-center">
              <h1 className="poeHeaderFont display-3 font-weight-bold text-center mt-4">Checkout</h1>
            </Row>
            <form onSubmit={this.handleSubmit}>
              <Row className="justify-content-around">
                <Button color="primary ml-5" onClick={() => this.props.back('catalog', {})} type="button" className="mobileFont mt-5 mb-3">Continue Shopping</Button>
                <h2 className="mobileFontHeader text-white mt-5">Total: {priceTotalInDollars}</h2>
                <Button onClick={this.validateNumber} color="primary" className="mobileFont orderBtn mt-5 mr-5">Place Order</Button>
              </Row>
              <div className="row justify-content-center">
                <div className="col-xs-4 col-lg-9">
                  <div className="input-group input-group mt-2">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroup-sizing-lg">required</span>
                    </div>
                    <input type="text" id="Name" className="form-control" onChange={this.handleChangeName} placeholder="Full Name" aria-label="Full Name" aria-describedby="inputGroup-sizing-lg" />
                  </div>

                  <div className="input-group input-group mt-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroup-sizing-lg">required</span>
                    </div>

                    <input type="text" name="Number" id="Num" className="form-control" onChange={this.handleChangeCreditCard} placeholder="Payment Method: xxxx-xxxx-xxxx-xxxx" aria-label="Payment Method" aria-describedby="inputGroup-sizing-lg" />
                  </div>

                  <div className="input-group input-group mt-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroup-sizing-lg">required</span>
                    </div>
                    <textarea className="form-control" id="Address" aria-label="Required" placeholder="Shipping Address" onChange={this.handleChangeShippingAddress} />
                  </div>
                  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
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
                  {/* warning modal */}
                  <Modal isOpen={this.state.warningModal} toggle={this.toggleWarning}>
                    <ModalHeader toggle={this.WarningToggle}>Error!</ModalHeader>
                    <ModalBody>
                      {this.state.warningStatement}
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggleWarning}>Close</Button>
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
