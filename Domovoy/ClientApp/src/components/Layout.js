import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { MapComponent } from './MapComponent'
import { HouseComponent } from './House/HouseComponent'
import { Route } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap'

export class Layout extends Component {
  static displayName = Layout.name;
  constructor() {
    super()
    this.state = {
      isSearched: true,
      house: {}
    }

    this.updateHouse = this.updateHouse.bind(this)    
  }

  updateHouse(houseId, isSearched) {
    fetch(`api/GeoData/GetHouse/${houseId}`)
      .then(response => response.json())
      .then(data => {
          this.setState({isSearched: isSearched, house: data})
      });    
  }
 

  render() {
    return (
      <div>
        <NavMenu handleMenuSelected={this.updateHouse} />
        <Container>
          <Route exact path='/' render={(props) => (
            <MapComponent {...props}
              house={this.state.house}
              updateHouse={this.updateHouse}
              isSearched={this.state.isSearched}
            />
          )} />
          <Route exact path='/House/:id' component={HouseComponent} />

          <Route exact path='/img/test' component={HouseComponent} />
        </Container>


        <Navbar sticky="bottom" className="navbar navbar-expand-md navbar-dark bg-dark">
          <Container>
            <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="http://eias.fstrf.ru/jkh_calc/#63" target="_blank">КАЛЬКУЛЯТОР КОММУНАЛЬНЫХ ПЛАТЕЖЕЙ</a>
                </li>

              </ul>
            </div>


            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">2019</a>
                </li>
              </ul>
            </div>
          </Container>
        </Navbar>

      </div>
    );
  }
}
