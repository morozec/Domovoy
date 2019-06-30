import React, { Component } from 'react';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Домовой</NavbarBrand>            
          </Container>
        </Navbar>
      </header>
    );
  }
}
