import React from 'react';
import { ImageCarousel } from './image-carousel';
import { Row, Col } from 'reactstrap';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      value: 1
    };
    this.fixPrice = this.fixPrice.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
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

  increment() {
    this.setState(prevState => {
      ++prevState.value;
    });
  }

  decrement() {
    this.setState(prev);
  }

  fixPrice() {
    const price = '$' + ((this.state.product.price / 100).toFixed(2));
    return price;
  }

  render() {
    console.log('this.state.product: ', this.state.product);
    console.log('this.props.product: ', this.props.product);
    if (!this.state.product) return null;
    return (
      <div>
        <Row>
          <Col>
            <button onClick={() => this.props.back('catalog', {})} type="button" className="btn btn-secondary my-3">Back</button>
          </Col>
        </Row>
        <Row>
          <Col sm="1" lg="0"></Col>
          <Col sm="10" lg="6" >
            <ImageCarousel images={this.state.product.images}/>
          </Col>

          <Col lg={{ size: 4, offset: 1 }} className="productDescription">
            <h2 className="font-weight-bold text-white">{this.state.product.name} <span className="badge badge-info">{this.fixPrice()}</span></h2>
            <p className="font-weight-bold text-white text-center mt-4">{this.state.product.shortDescription}</p>
            <Row className="justify-content-md-center">
              <Col md={{ size: 6, offset: 1 }}>
                <button onClick={() => this.props.addToCart(this.state.product)}type="button" className="btn btn-primary mx-auto">Add to Cart</button>
                <br/>
              </Col>
            </Row>
            <br/>
            <p className="mt-2 mb-4 text-white">{this.state.product.longDescription}</p>
            <br/>
          </Col>
        </Row>
      </div>
    );

  }
}
