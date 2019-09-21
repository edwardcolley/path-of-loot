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
        var prevState = { ...this.state.cart };
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
        // console.log('this.state.productid.', this.state.cart[product.id]['quantity']);
        var prevState = { ...this.state.cart };
        var itemId = myJson.item.id;
        if (this.state.cart[product.id]) {
          var newQuantity = parseInt(this.state.cart[product.id]['quantity']) + 1;
          this.setState({
            cart: {
              ...prevState,
              [`${itemId}`]: {
                quantity: newQuantity,
                name: myJson.item.name,
                image: myJson.item.image
              }
            }
          });
        } else {
          this.setState({
            cart: {
              ...prevState,
              [`${itemId}`]: {
                quantity: 1,
                name: myJson.item.name,
                image: myJson.item.image
              }
            }
          });
          
        }
      })
      .catch(error => console.error('Error: ', error));
      console.log('this.addtocart this.state.cart: ', this.state.cart);
  }

  deleteFromCart(product) {
    fetch('/api/cart.php', {
      method: 'DELETE',
      body: JSON.stringify(product),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(myJson => {
        if (product.quantity === 1) {
          this.setState({
            cart: {
              [product.id]: null
            }
          });
        } else {
          this.setState({
            cart: {
              [product.id]: {
                name: [product.name],
                quantity: [product.quantity] - 1
              }
            }
          });
        }

        // const newCartArray = this.state.cart.filter(incart => incart.cart_id !== product.cart_id);
        // this.setState({ cart: newCartArray });
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
    console.log('this.state.cart: ', this.state.cart);
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
