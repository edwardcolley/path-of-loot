import React from 'react';
import { Navbar, NavbarBrand, NavbarToggler, NavLink, Collapse, Nav, NavItem } from 'reactstrap';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      cart: []
    };
    this.toggle = this.toggle.bind(this);
    this.renderCart = this.renderCart.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  renderCart() {
    var cartQuantityArray = [];
    for (var key in this.props.cartItemCount) {
      cartQuantityArray.push(this.props.cartItemCount[key]['quantity']);
    }
    const totalQuantity = cartQuantityArray.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0);
    return totalQuantity;
  }

  render() {
    return (
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavbarBrand className="navbarStyle"><img height="40" src="/images/poeicon3.jpg" className="mt-1" onClick={() => this.props.onClick('catalog', {})}/> Path of Currency</NavbarBrand>
        <NavbarToggler onClick={this.toggle}/>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="#" onClick={() => this.props.onClick('catalog', {})}>Top Items <span className="sr-only">(current)</span></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={() => this.props.onClick('cart', {})}>Checkout Cart <span className="sr-only">(current)</span></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#"><i className="fas fa-shopping-cart" onClick={() => this.props.onClick('cart', {})}> {this.renderCart()}</i></NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    //       <nav class="navbar navbar-expand-lg navbar bg">
    //   <a class="navbar-brand" href="#">Brand Goes Here</a>
    //   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //     <span class="navbar-toggler-icon"></span>
    //   </button>

    //   <div class="collapse navbar-collapse" id="navbarSupportedContent">
    //     <ul class="navbar-nav">
    //       <li class="nav-item active">
    //         <a class="nav-link" href="#">Current Page Link <span class="sr-only">(current)</span></a>
    //       </li>
    //       <li class="nav-item">
    //         <a class="nav-link" href="#">Another Page Link</a>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
    );
  }

}
