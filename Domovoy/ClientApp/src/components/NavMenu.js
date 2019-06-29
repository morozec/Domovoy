import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Form, Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Домовой</NavbarBrand>

            <Form inline onSubmit={e => {e.preventDefault(); this.props.handleSearchButtonClick()}}>
              <Input type="text" placeholder="Введите адрес для поиска" className=" mr-sm-2" value={this.props.searchAddress} 
                onChange={this.props.handleSearchAddressChange}
              />
              <Button type="submit">Поиск</Button>
            </Form>
          </Container>
        </Navbar>
      </header>
    );
  }
}
