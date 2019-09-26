import React from 'react';

export class Quantity extends React.Component {

  render() {

    return (
      <div>
        <div className="quantity-input">
          <button className="quantity-input__modifier quantity-input__modifier--left" onClick={this.props.decrement}>
            &mdash;
          </button>
          <input className="quantity-input__screen" type="text" value={this.props.quantity} readOnly />
          <button className="quantity-input__modifier quantity-input__modifier--right" onClick={this.props.increment}>
            &#xff0b;
          </button>
        </div>
      </div>
    );
  }
}
