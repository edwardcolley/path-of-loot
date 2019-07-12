import React from 'react';
import { Header } from './header';
import { ProductList } from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
  }

  getProducts() {
    fetch('/api/products.php')
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          products: myJson
        });
      });
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div className="container">
          <Header />
          <ProductList onClick={this.setView} products={this.state.products}/>
        </div>
      );
    } else {
      return (
        <div className="container">
          <Header />
          <ProductDetails back={this.setView} id={this.state.view.params} products={this.state.products} />
        </div>
      );
    }
  }
}
