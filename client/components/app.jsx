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

  getCartItems() {
    fetch('/api/cart.php')
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          cart: myJson
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
    this.getCartItems();
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div className="container-fluid">
          <Header cartItemCount={this.state.cart.length}/>
          <ProductList onClick={this.setView} products={this.state.products}/>
        </div>
      );
    } else {
      return (
        <div>
          <div className="container-fluid">
            <Header cartItemCount={this.state.cart.length}/>
          </div>
          <div className="container">
            <ProductDetails back={this.setView} id={this.state.view.params} products={this.state.products} />
          </div>
        </div>

      );
    }
  }
}
