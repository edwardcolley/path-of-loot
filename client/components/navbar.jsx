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
        <NavbarBrand className="text-white"><i className="fas fa-store-alt" onClick={() => this.props.onClick('catalog', {})}/> PoE Item Shop</NavbarBrand>
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
    // </Navbar>
    );
  }

}
