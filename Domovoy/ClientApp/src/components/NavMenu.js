import React, { Component } from 'react';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

import logo from '../img/logo_domovoy.svg';

import { CustomToggle, CustomMenu } from './CustomToggle'
import { Dropdown } from 'react-bootstrap'

export class NavMenu extends Component {
  
  constructor(){
    super()
    this.state = {
      searchAddress:'',
      isDropDownVisible:false,
      houses:[]
    }
    this.handleSearchAddressChange = this.handleSearchAddressChange.bind(this)
    this.renderHouses = this.renderHouses.bind(this)
    this.handleSelected = this.handleSelected.bind(this)
  }

  handleSearchAddressChange(value) {
    console.log(value)
    this.setState({ searchAddress: value, isDropDownVisible:true }, () => {
        if (this.state.searchAddress===''){
            this.setState({isDropDownVisible:false, houses:[]})
        }else{
            fetch(`api/GeoData/GetFirstHousesByAddress/${this.state.searchAddress}/10`)
                .then(response => response.json())
                .then(data => {                    
                    this.setState({ houses: data })
                })
        }

    })
}

handleSelected(){  
  this.setState({isDropDownVisible:true})
}


renderHouses(){
  const context = this
  return(
    <CustomMenu handleSearchAddressChange={this.handleSearchAddressChange} onSelected = {this.handleSelected} className='block-search'>
          {this.state.isDropDownVisible && this.state.houses.map(h => <Dropdown.Item 
                  key={h.houseId}                     
                  onClick={(e) => {context.setState({isDropDownVisible:false}); this.props.handleMenuSelected(h)}}
              >
                  {h.address}
              </Dropdown.Item>)}
      </CustomMenu>    
  )
}

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white">
          <Container>
            <div className="row w-100">
              <div className="col-lg-5">
                <NavbarBrand tag={Link} to="/">
                  <img src={logo} />
                </NavbarBrand>  
                {this.renderHouses()}
              </div>
              <div className="col-lg-7">
                <div className="header-menu">
                  <a href="#" className="header-menu-item">О ПРОЕКТЕ</a>
                  <a href="#" className="header-menu-item">РЕЙТИНГ ДОМОВ</a>
                  <a href="#" className="header-menu-item">ЗАДАТЬ ВОПРОС</a>
                </div>

                
              </div>
              </div>
          </Container>
        </Navbar>
      </header>
    );
  }
}
