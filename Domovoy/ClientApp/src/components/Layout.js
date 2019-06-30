import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { MapComponent } from './MapComponent'
import { HouseComponent } from './House/HouseComponent'
import { Route } from 'react-router';

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

                <Route exact path='/img/test' component={HouseComponent} />  
        </Container>
        

      </div>
    );
  }
}
