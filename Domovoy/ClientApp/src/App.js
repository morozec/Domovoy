import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './components/NavMenu';
import { MapComponent } from './components/MapComponent'
import { HouseComponent } from './components/House/HouseComponent'
import { Route, Switch } from 'react-router';
import { Navbar } from 'react-bootstrap'

import './components/Main.css';

import Profile from './components/Profile'
import PrivateRoute from './components/PrivateRoute'
import ValidatedLoginForm from './components/Login/ValidationLoginForm';

const App = () => {

  const [isSearched, setIsSearched] = useState(true)
  const [house, setHouse] = useState(undefined)
  const [houses, setHouses] = useState(undefined)
  const [map, setMap] = useState(undefined)
  
  useEffect(() => { //componentDidMount      
    fetch(`api/GeoData/GetHouses`)
      .then(response => response.json())
      .then(houses => {
        setHouses(houses)
      })
  }, [])


  const updateHouse = (houseId, isSearched) => {
    fetch(`api/GeoData/GetHouse/${houseId}`)
      .then(response => response.json())
      .then(data => {
        setIsSearched(isSearched)
        setHouse(data)
      });
  }

  const clearHouse = () => {
    setIsSearched(false)
    setHouse(undefined)
  }

  const updateMap = (map) => {
    setMap(map)
  }

  return (
    <div className='layout'>
      <NavMenu handleMenuSelected={updateHouse} />
      <Container className='layout-content'>
        <Switch>
          <Route exact path='/' render={(props) => (
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
          <Route exact path='/House/:id' component={HouseComponent} />
          <Route exact path = '/login' component = {ValidatedLoginForm} />
          <PrivateRoute exact path='/profile' component={Profile} />
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
                <a className="nav-link" href="/">2019</a>
              </li>
            </ul>
          </div>
        </Container>
      </Navbar>

    </div>
  );

}


export default App