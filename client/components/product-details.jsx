import React from 'react';
import { ImageCarousel } from './image-carousel';
import { Row, Col, Modal, ModalFooter, ModalHeader, Button } from 'reactstrap';
import { Quantity } from './quantity';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      value: 1,
      modal: false
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.fixPrice = this.fixPrice.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  increment() {
    this.setState(prevState => ({
      value: ++prevState.value
    }));
  }

  decrement() {
    this.setState(prevState => ({ value: prevState.value > 0 ? --prevState.value : 0 }));
  }

  componentDidMount() {
    fetch('/api/products.php?id=' + this.props.id)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          product: myJson
        });
      });
  }

  fixPrice() {
    const price = '$' + ((this.state.product.price / 100).toFixed(2));
    return price;
  }

  toggleModal() {
    if (this.state.modal === false) {
      this.props.addToCart(this.state.product, this.state.value);
    }
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    if (!this.state.product) return null;
    return (
      <Row>
        <Col xs={{ size: 10, offset: 1 }} className="productBackground">
          <Row className="poeBanner">
            <Col xs={{ size: 1 }} className="mt-4">
              <button onClick={() => this.props.back('catalog', {})} type="button" className="btn btn-secondary my-3">Back</button>
            </Col>
            <Col md={{ offset: 1 }} lg={{ offset: 2 }}>
              <h1 className="poeHeaderFont display-3 font-weight-bold text-center mt-4">Product Details</h1>
            </Col>
          </Row>
          <Row className="productRow mt-5">
            <Col sm="1" lg="0"></Col>
            <Col sm="10" lg="6" >
              <ImageCarousel images={this.state.product.images}/>
            </Col>

            <Col lg={{ size: 4 }} className="productDescription">
              <h2 className="font-weight-bold text-white text-center productDetailsStyle">{this.state.product.name} <span className="badge badge-info">{this.fixPrice()}</span></h2>
              <p className="font-weight-bold text-white text-center mt-4">{this.state.product.shortDescription}</p>
              <Row className="justify-content-md-center">
                <Col md={{ size: 5 }} className="mb-2">
                  <Quantity quantity={this.state.value} increment={this.increment} decrement={this.decrement}/>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col md={{ size: 6, offset: 1 }}>
                  <button onClick={this.toggleModal} type="button" className="mobileBtn btn btn-primary mx-auto">Add to Cart</button>
                  <br/>
                </Col>
              </Row>
              <br/>
              <p className="mt-2 mb-4 text-white longDescription">{this.state.product.longDescription}</p>
              <br/>
            </Col>
            <Modal isOpen={this.state.modal}>
              <ModalHeader className="text-center">
              Product has been added to cart!
              </ModalHeader>
              <ModalFooter>
                <Button onClick={this.toggleModal} color="info">Keep Shopping</Button>
                <Button onClick={() => { this.props.back('cart', {}); } } color="primary">Go To Cart</Button>
              </ModalFooter>
            </Modal>
          </Row>
        </Col>
      </Row>
    );

  }
}
