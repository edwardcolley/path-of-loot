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
          <div className="col-lg-8">
            <img className="shadow p-3 mb-5 bg-white rounded" src={this.state.product.image} alt="image"/>
          </div>
          <div className="col-lg-4">
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
