import React from 'react';

export class Header extends React.Component {

  render() {
    return (
      <div className="row">
        <h1 className="col-11 display-2 font-weight-bold text-warning text-center mt-4"><img src="/images/shoppingcart.png"></img>Wicked Sales</h1>
        <h5 className="col-1"><span className="badge badge-primary mt-3" onClick={() => this.props.onClick('cart', {})}><img height="30" width="30" src="/images/shopping.png"/>{this.props.cartItemCount}</span></h5>
      </div>
    );
  }

}
