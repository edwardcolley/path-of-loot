import React from 'react';
import { ImageCarousel } from './image-carousel';
import { Row, Col } from 'reactstrap';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.fixPrice = this.fixPrice.bind(this);
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

  render() {
    if (!this.state.product) return null;
    return (
      <div>
        <Row>
          <Col>
            <button onClick={() => this.props.back('catalog', {})} type="button" className="btn btn-secondary my-3">Back</button>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
            <ImageCarousel images={this.state.product.images}/>
          </Col>
          <Col xs={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }} className="productDescription">
            <h2 className="font-weight-bold text-white">{this.state.product.name} <span className="badge badge-info">{this.fixPrice()}</span></h2>
            <p className="font-weight-bold text-white mt-4">{this.state.product.shortDescription}</p>
            <Row className="justify-content-md-center">
              <Col md={{ size: 6 }}>
                <button onClick={() => this.props.addToCart(this.state.product)}type="button" className="btn btn-primary btn-lg mx-auto">Add to Cart</button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>{this.state.product.longDescription}</p>
          </Col>
        </Row>
      </div>
    );

  }
}
