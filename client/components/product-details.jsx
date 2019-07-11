import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.fixPrice = this.fixPrice.bind(this);
  }

  componentDidMount() {
    fetch('/api/products.php?id=1')
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
    // const price = '$' + ((this.state.product.price / 100).toFixed(2));
    if (!this.state.product) return null;
    return (
      <div>
        <div className="row">
          <div className="col">
            <button type="button" className="btn btn-outline-secondary mb-3">Back</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <img src={this.state.product.image} alt="image"/>
          </div>
          <div className="col-md-4">
            <h1>{this.state.product.name} <span className="badge badge-info">{this.fixPrice()}</span></h1>
            <p className="font-weight-bold">{this.state.product.shortDescription}</p>
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
