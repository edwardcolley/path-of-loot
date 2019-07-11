import React from 'react';
import { Header } from './header';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
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

  render() {
    if (!this.state.product) return null;
    return (
      <div className="container">
        <Header />
        <div className="row">
          <div className="col">
            <img src={this.state.product.image} alt="image"/>
          </div>
          <div className="col">
            <h1>{this.state.product.name}</h1>
          </div>
        </div>
      </div>
    );

  }
}
