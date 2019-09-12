import React from 'react';

export class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    }
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <Navbar color="dark" expand="lg">
        <NavbarBrand><i className="fas fa-store-alt"/> Wicked Sales</NavbarBrand>
      </Navbar>

      // <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      //   <a className="navbar-brand" href="" ><i className="fas fa-store-alt"/> Wicked Sales</a>
      //   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      //     <span className="navbar-toggler-icon"></span>
      //   </button>

      //   <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      //     <ul className="navbar-nav">
      //       <li className="nav-item">
      //         <a className="nav-link" href="#" onClick={() => this.props.onClick('catalog', {})}>Top Items <span className="sr-only">(current)</span></a>
      //       </li>
      //       <li className="nav-item">
      //         <a className="nav-link" href="#" onClick={() => this.props.onClick('cart', {})}>Checkout Cart</a>
      //       </li>
      //       <li className="nav-item">
      //         <a className="nav-link" href="#"><i className="fas fa-shopping-cart" onClick={() => this.props.onClick('cart', {})}> {this.props.cartItemCount}</i></a>
      //       </li>
      //     </ul>
      //   </div>
      // </nav>
    );
  }

}
