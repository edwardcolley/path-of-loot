import React from 'react';
import { Header } from './header';
import { ProductList } from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
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

  // getProductById(id) {
  //   fetch('/api/products.php?id=' + id)
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(myJson => {
  //       console.log(myJson);
  //       this.setState({
  //         grades: myJson
  //       });
  //     });
  // }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <div className="container">
        <Header />
        <ProductList products={this.state.products}/>
        <ProductDetails products={this.state.products} />
      </div>
    );
  }
}
