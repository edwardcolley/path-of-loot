import React from 'react';
// import { Header } from './header';
// import { Container } from 'reactstrap';
import { ProductList } from './product-list';
import ProductDetails from './product-details';
import { CartSummary } from './cart-summary';
import { CheckoutForm } from './checkout-form';
import { NavBar } from './navbar';
import { LandingPageCarousel } from './landing-page-crousel';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      adverts: [],
      view: {
        name: 'catalog',
        params: {}
      },
      cart: {}
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.getAdverts = this.getAdverts.bind(this);
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

  getAdverts() {
    fetch('/api/adverts.php')
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          adverts: myJson
        });
      });
  }

  getCartItems() {
    fetch('/api/cart.php', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        for (var i = 0; i <= myJson.length - 1; i++) {
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

  addToCart(product, quantity) {
    console.log('addtocart did run');
    console.log(product, quantity);
    fetch('/api/cart.php', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        id: parseInt(product.id),
        name: product.name,
        quantity: quantity,
        images: product.images,
        longDescription: product.longDescription,
        price: product.price,
        shortDescription: product.shortDescription
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(myJson => {
        console.log('myJson: ', myJson);
        var prevState = { ...this.state.cart };
        if (this.state.cart[product.id]) {
          var newQuantity = parseInt(this.state.cart[product.id]['quantity']) + quantity;
          console.log('this.state.cart[product.id]: ', this.state.cart[product.id]);
          console.log('myjson.item.quantity: ', myJson.item.quantity);
          console.log('newQuantity: ', newQuantity);
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
            console.log('addtocart this.state.cart: ', this.state.cart);
          });
        } else {
          this.setState({
            cart: {
              ...prevState,
              [product.id]: {
                quantity: quantity,
                name: myJson.item.name,
                cart_id: myJson.item.cart_id,
                image: myJson.item.images[0],
                price: myJson.item.price,
                product_id: product.id,
                shortDescription: myJson.item.shortDescription
              }
            }
          }, () => {
            // console.log(this.state.cart);
          });

        }
      })
      .catch(error => console.error('Error: ', error));
  }

  updateCart(product, quantity) {
    console.log('product: ', product);
    fetch('/api/cart.php', {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify({
        id: parseInt(product.product_id),
        quantity: parseInt(quantity),
        images: product.image,
        price: product.price,
        shortDescription: product.shortDescription,
        cart_id: product.cart_id
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(myJson => {
        console.log('myJson returned: ', myJson);
        var quantityVal = parseInt(quantity);
        var prevState = { ...this.state.cart };
        if (quantityVal > 0) {
          // var newQuantity = parseInt(this.state.cart[product.id]['quantity']) + quantity;
          this.setState({
            cart: {
              ...prevState,
              [product.product_id]: {
                quantity: myJson.item.quantity,
                name: product.name,
                cart_id: myJson.item.cart_id,
                image: myJson.item.images,
                price: myJson.item.price,
                product_id: product.product_id,
                shortDescription: myJson.item.shortDescription
              }
            }
          }, () => {
            console.log('updateCart this.state.cart: ', this.state.cart);
          });
        } else {
          var newState = {};
          for (var key in this.state.cart) {
            if (key != [product.product_id]) {
              newState[key] = this.state.cart[key];
            }
          }
          this.setState({
            cart: newState
          });
          // this.setState({
          //   cart: {
          //     ...prevState,
          //     [product.id]: {
          //       quantity: quantity,
          //       name: myJson.item.name,
          //       cart_id: myJson.item.cart_id,
          //       image: myJson.item.images[0],
          //       price: myJson.item.price,
          //       product_id: product.id,
          //       shortDescription: myJson.item.shortDescription
          //     }
          //   }
          // }, () => {
          //   // console.log(this.state.cart);
          // });
        }
      })
      .catch(error => console.error('Error: ', error));
  }

  deleteFromCart(product) {
    fetch('/api/cart.php', {
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify(product),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(myJson => {
        var newState = {};
        for (var key in this.state.cart) {
          if (key != [product.product_id]) {
            newState[key] = this.state.cart[key];
          }
        }
        this.setState({
          cart: newState
        });
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
    this.getAdverts();
  }

  render() {
    console.log('app state: ', this.state);
    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <NavBar onClick={this.setView} cartItemCount={this.state.cart}/>
          <div className="container-fluid">
            {/* <Header /> */}
            {this.state.adverts.length !== 0 &&
            <LandingPageCarousel images={this.state.adverts}/>
            }
            <ProductList onClick={this.setView} products={this.state.products}/>
          </div>
        </div>
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <React.Fragment>
          <NavBar onClick={this.setView} cartItemCount={this.state.cart}/>
          <CartSummary delete={this.deleteFromCart} update={this.updateCart} cart={this.state.cart} back={this.setView}/>;
        </React.Fragment>
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
