import React from 'react';
import { ImageCarousel } from './image-carousel';

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
        <div className="row">
          <div className="col">
            <button onClick={() => this.props.back('catalog', {})} type="button" className="btn btn-outline-secondary mb-3">Back</button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <ImageCarousel images={this.state.product.images}/>
          </div>
          <div className="col-lg-4">
            <h2>{this.state.product.name} <span className="badge badge-info">{this.fixPrice()}</span></h2>
            <p className="font-weight-bold mt-4">{this.state.product.shortDescription}</p>
            <div className="row justify-content-md-center">
              <div className="col-md-6">
                <button onClick={() => this.props.addToCart(this.state.product)}type="button" className="btn btn-primary btn-lg mx-auto">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>{this.state.product.longDescription}</p>
          </div>
        </div>
      </div>
    );

  }
}
