import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './components/NavMenu';
import { MapComponent } from './components/MapComponent'
import { HouseComponent } from './components/House/HouseComponent'
import { Route } from 'react-router';
import { Navbar } from 'react-bootstrap'
import './components/Main.css';

export default class App extends Component {
  static displayName = App.name; 
  constructor() {
    super()
    this.state = {
      isSearched: true,
      house: undefined,
      houses: undefined,
      map:undefined
    }

    this.updateHouse = this.updateHouse.bind(this)
    this.clearHouse = this.clearHouse.bind(this)
    this.updateMap = this.updateMap.bind(this)
  }

  updateHouse(houseId, isSearched) {
    fetch(`api/GeoData/GetHouse/${houseId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ isSearched: isSearched, house: data })
      });
  }

  clearHouse() {
    this.setState({ isSearched: false, house: undefined })
  }

  updateMap(map){
    //console.log('layout', mapExtent)
    this.setState({map:map})
  }

  componentDidMount() {
    fetch(`api/GeoData/GetHouses`)
      .then(response => response.json())
      .then(houses => {
        this.setState({houses:houses})
      })

  }

  render () {
    return (
      <div className='layout'>
      <NavMenu handleMenuSelected={this.updateHouse} />
      <Container className='layout-content'>
        <Route exact path='/' render={(props) => (
          <MapComponent {...props}
            house={this.state.house}
            updateHouse={this.updateHouse}
            isSearched={this.state.isSearched}
            clearHouse={this.clearHouse}
            houses={this.state.houses}
            map = {this.state.map}
            updateMap = {this.updateMap}
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
