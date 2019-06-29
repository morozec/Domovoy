import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { MapComponent } from './MapComponent'

const MyContext = React.createContext(); 

export class Layout extends Component {
  static displayName = Layout.name;

  constructor() {
    super()
    this.state = {
      searchAddress: '',
      resultSearchAddress :''
    }
    this.handleSearchAddressChange = this.handleSearchAddressChange.bind(this)
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this)
  }

  handleSearchAddressChange(e) {
    this.setState({ searchAddress: e.target.value })
  }

  handleSearchButtonClick(){    
    this.setState({resultSearchAddress:this.state.searchAddress})
  }

  render() {

    
    
    return (
      <div>
        <NavMenu
          searchAddress={this.state.searchAddress}
          handleSearchAddressChange={this.handleSearchAddressChange}
          handleSearchButtonClick={this.handleSearchButtonClick}
        />
        <Container>
          <MapComponent searchAddress = {this.state.resultSearchAddress} />
        </Container>
        

      </div>
    );
  }
}
