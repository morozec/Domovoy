import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { MapComponent } from './MapComponent'
import { HouseComponent } from './House/HouseComponent'
import { Route } from 'react-router';
import {Navbar, Nav}from 'react-bootstrap'

export class Layout extends Component {
  static displayName = Layout.name;
  constructor(){
    super()
    this.state = {
      house:{} 
    }

    this.handleMenuSelected = this.handleMenuSelected.bind(this)
  }
  
  handleMenuSelected(value){    
    console.log('house',value)
    this.setState({house:value})
  }

  

  render() {

    
    
    return (
      <div className="wrapper">

        <NavMenu handleMenuSelected = {this.handleMenuSelected} />

        <Container >
            <Route exact path='/' render={(props)=> (
              <MapComponent {...props} house={this.state.house}  />
            )} />
                <Route exact path='/House/:id' component={HouseComponent} />  

                <Route exact path='/img/test' component={HouseComponent} />  
        </Container>


        <Navbar className="navbar navbar-dark bg-dark footer">
          <Container>
          <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
              <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                      <a className="nav-link" href="http://eias.fstrf.ru/jkh_calc/#63" target="_blank">КАЛЬКУЛЯТОР КОММУНАЛЬНЫХ ПЛАТЕЖЕЙ</a>
                  </li>
                              
              </ul>

              <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                      <a className="nav-link">2019</a>
                  </li>                  
              </ul>
          </div>
          
          </Container>
      </Navbar>

      </div>
    );
  }
}
