import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import { MapComponent } from './MapComponent'
import { HouseComponent } from './House/HouseComponent'
import { Route, Switch } from 'react-router';
import { Navbar } from 'react-bootstrap'
import Profile from './Profile'
import PrivateRoute from './PrivateRoute';

const Layout = () => {
  const [isSearched, setIsSearched] = useState(true)
  const [house, setHouse] = useState(undefined)
  const [houses, setHouses] = useState(undefined)
  const [map, setMap] = useState(undefined)

  const updateHouse = (houseId, isSearched) => {
    fetch(`api/GeoData/GetHouse/${houseId}`)
      .then(response => response.json())
      .then(data => {
        setIsSearched(isSearched)
        setHouse(data)
      })
  }

  const clearHouse = () => {
    setIsSearched(false)
    setHouse(undefined)
  }

  const updateMap = (map) => setMap(map)


  useEffect(() => {
    console.log('Layout mount')
    fetch(`api/GeoData/GetHouses`)
      .then(response => response.json())
      .then(houses => {
        setHouses(houses)
      })
  }, [])


  return (
    <div>
      <NavMenu handleMenuSelected={this.updateHouse} />
      <Container>
        <Switch>       
          <Route exact path='/House/:id' component={HouseComponent} />
          <Route exact path='/img/test' component={HouseComponent} />
          <PrivateRoute exact path='/profile' component={Profile} />
          <Route path='/' render={(props) => (
            <MapComponent {...props}
              house={house}
              updateHouse={updateHouse}
              isSearched={isSearched}
              clearHouse={clearHouse}
              houses={houses}
              map={map}
              updateMap={updateMap}
            />
          )} />
        </Switch>
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
  )
}

export { Layout }