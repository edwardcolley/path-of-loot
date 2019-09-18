import React from 'react';
import { ProductListItem } from './product-list-item';
import { Col, Row } from 'reactstrap';

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
      <Col>
        <Row>
          {this.renderItems()}
        </Row>
      </Col>
    );
  }
}
