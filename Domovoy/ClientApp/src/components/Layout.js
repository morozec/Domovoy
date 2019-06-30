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
      <div>
        <NavMenu handleMenuSelected = {this.handleMenuSelected} />
        <Container>
            <Route exact path='/' render={(props)=> (
              <MapComponent {...props} house={this.state.house}  />
            )} />
            <Route exact path='/House/:id' component={HouseComponent} />  
        </Container>


        <Navbar sticky="bottom" className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
              <ul className="navbar-nav mr-auto">                 
                  <li className="nav-item">
                      <a className="nav-link" href="//codeply.com">О ПРОЕКТЕ</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="#">РЕЙТИНГ ДОМОВ</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="#">ЗАДАТЬ ВОПРОС</a>
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
      </Navbar>

      </div>
    );
  }
}
