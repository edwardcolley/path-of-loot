import React from 'react';
import { Header } from './header';
import { ProductList } from './product-list';
import ProductDetails from './product-details';
import { CartSummary } from './cart-summary';
import { CheckoutForm } from './checkout-form';

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
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  placeOrder(shippingInformation) {
    shippingInformation.cartItems = this.state.cart;
    fetch('/api/orders.php', {
      method: 'POST',
      body: JSON.stringify({ shippingInformation }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        response.json();
      })
      .then(myJson => this.setState({
        cart: [],
        view: {
          name: 'catalog',
          params: {}
        }
      }))
      .catch(error => console.error('Error: ', error));
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

  addToCart(product) {
    fetch('/api/cart.php', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(myJson => this.setState({ cart: [...this.state.cart, myJson] }))
      .catch(error => console.error('Error: ', error));

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
          <Header onClick={this.setView} cartItemCount={this.state.cart.length}/>
          <ProductList onClick={this.setView} products={this.state.products}/>
        </div>
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <div>
          <Header />
          <CartSummary cart={this.state.cart} back={this.setView}/>;
        </div>
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <div>
          <Header onClick={this.setView} cartItemCount={this.state.cart.length}/>
          <CheckoutForm back={this.setView} cart={this.state.cart} placeOrder={this.placeOrder}/>
        </div>
      );
    } else {
      return (
        <div>
          <div className="container-fluid">
            <Header onClick={this.setView} cartItemCount={this.state.cart.length}/>
          </div>
          <div className="container">
            <ProductDetails addToCart={this.addToCart} back={this.setView} id={this.state.view.params} products={this.state.products} />
          </div>

        </div>

      );
    }
  }
}
