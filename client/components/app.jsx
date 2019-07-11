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
      }
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
    return (
      <div className="container">
        <Header />
        <ProductList onClick={this.setView} products={this.state.products}/>
        <ProductDetails products={this.state.products} />
      </div>
    );
  }
}
