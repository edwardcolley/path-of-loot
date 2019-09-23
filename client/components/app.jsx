import React from 'react';
import { Header } from './header';
import { ProductList } from './product-list';
import ProductDetails from './product-details';
import { CartSummary } from './cart-summary';
import { CheckoutForm } from './checkout-form';
import { NavBar } from './navbar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      view: {
        name: 'catalog',
        params: {}
      },
      cart: {}
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
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
        // var prevState = { ...this.state.cart };
        for (var i = 0; i <= myJson.length - 1; i++) {
          // prevState = { ...this.state.cart };
          this.setState({
            cart: {
              ...this.state.cart,
              [myJson[i].id]: {
                name: myJson[i].name,
                quantity: myJson[i].quantity,
                image: myJson[i].image,
                cart_id: myJson[i].cart_id,
                price: myJson[i].price,
                product_id: myJson[i].product_id,
                shortDescription: myJson[i].shortDescription
              }
            }
          });
        }
      });
  }

  addToCart(product) {
    fetch('/api/cart.php', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(myJson => {
        var prevState = { ...this.state.cart };
        if (this.state.cart[product.id]) {
          var newQuantity = parseInt(this.state.cart[product.id]['quantity']) + 1;
          this.setState({
            cart: {
              ...prevState,
              [product.id]: {
                quantity: newQuantity,
                name: myJson.item.name,
                cart_id: myJson.item.cart_id,
                image: myJson.item.images[0],
                price: myJson.item.price,
                product_id: product.id,
                shortDescription: myJson.item.shortDescription
              }
            }
          }, () => {
            console.log(this.state.cart);
          });
        } else {
          this.setState({
            cart: {
              ...prevState,
              [product.id]: {
                quantity: 1,
                name: myJson.item.name,
                cart_id: myJson.item.cart_id,
                image: myJson.item.images[0],
                price: myJson.item.price,
                product_id: product.id,
                shortDescription: myJson.item.shortDescription
              }
            }
          }, () => {
            console.log(this.state.cart);
          });

        }
      })
      .catch(error => console.error('Error: ', error));
  }

  deleteFromCart(product) {
    fetch('/api/cart.php', {
      method: 'DELETE',
      body: JSON.stringify(product),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(myJson => {
        var prevState = { ...this.state.cart };
        if (product['quantity'] === 1) {
          var newState = {};
          for (var key in this.state.cart) {
            if (key != [product.product_id]) {
              newState[key] = this.state.cart[key];
            }
          }
          this.setState({
            cart: newState
          });
        } else {
          var newQuantity = parseInt(this.state.cart[product.product_id]['quantity']) - 1;
          this.setState({
            cart: {
              ...prevState,
              [product.product_id]: {
                quantity: newQuantity,
                name: product.name,
                cart_id: product.cart_id,
                image: product.image,
                price: product.price,
                product_id: product.product_id,
                shortDescription: product.shortDescription
              }
            }
          });
        }
      })
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
        <div>
          <NavBar onClick={this.setView} cartItemCount={this.state.cart}/>
          <div className="container-fluid">
            <Header />
            <ProductList onClick={this.setView} products={this.state.products}/>
          </div>
        </div>
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <div>
          <NavBar onClick={this.setView} cartItemCount={this.state.cart}/>
          <CartSummary delete={this.deleteFromCart} cart={this.state.cart} back={this.setView}/>;
        </div>
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <div>
          <NavBar onClick={this.setView} cartItemCount={this.state.cart}/>
          <CheckoutForm back={this.setView} cart={this.state.cart} placeOrder={this.placeOrder}/>
        </div>
      );
    } else {
      return (
        <div>
          <NavBar onClick={this.setView} cartItemCount={this.state.cart}/>
          <div className="container">
            <ProductDetails addToCart={this.addToCart} back={this.setView} id={this.state.view.params} products={this.state.products} />
          </div>
        </div>

      );
    }
  }
}
