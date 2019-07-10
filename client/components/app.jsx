import React from 'react';
import { Header } from './header';
import { ProductListItem } from './product-list-item';

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

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <div>
        <Header />
        <br/>
        <ProductListItem />
      </div>
    );
  }
}
