import React from 'react';
import { Navbar, NavbarBrand, NavbarToggler, NavLink, Collapse, Nav, NavItem } from 'reactstrap';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavbarBrand className="text-white"><i className="fas fa-store-alt" onClick={() => this.props.onClick('catalog', {})}/> Path of Trading</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="#" onClick={() => this.props.onClick('catalog', {})}>Top Items <span className="sr-only">(current)</span></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={() => this.props.onClick('cart', {})}>Checkout Cart <span className="sr-only">(current)</span></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#"><i className="fas fa-shopping-cart" onClick={() => this.props.onClick('cart', {})}> {this.props.cartItemCount}</i></NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }

}
