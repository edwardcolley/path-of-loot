import React from 'react';
import { ProductListItem } from './product-list-item';

export class ProductList extends React.Component {

  renderItems() {
    return this.props.products.map(input => {
      return (
        <ProductListItem onClick={() => this.props.onClick(input.name, input.id)} key={input.id} input={input} />
      );
    });
  }

  render() {
    return (
      <div className="col">
        <div className="row">
          {this.renderItems()}
        </div>
      </div>
    );
  }
}
