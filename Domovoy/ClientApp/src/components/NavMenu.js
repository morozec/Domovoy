import React, { Component } from 'react';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

import logo from '../img/logo_domovoy.svg';

import { CustomMenu } from './CustomToggle'
import { SEARCH_ADDRESS_COUNT } from './../constants/constants'
import { Dropdown } from 'react-bootstrap'

export class NavMenu extends Component {

  constructor() {
    super()
    this.state = {
      searchAddress: '',
      housesSearchAddress: '',//адрес, на который были выцеплены дома из базы
      isDropDownVisible: false,
      houses: []
    }
    this.handleSearchAddressChange = this.handleSearchAddressChange.bind(this)
    this.renderHouses = this.renderHouses.bind(this)
    this.handleFormControlClick = this.handleFormControlClick.bind(this)
    this.handleDropdownItemClick = this.handleDropdownItemClick.bind(this)
    this.updateHouses = this.updateHouses.bind(this)
    this.updateHousesLocally = this.updateHousesLocally.bind(this)
  }

  handleSearchAddressChange(value) {    
    const isIncludingPrev = this.state.housesSearchAddress !== '' && value.startsWith(this.state.housesSearchAddress) && this.state.houses.length < SEARCH_ADDRESS_COUNT

    this.setState({ searchAddress: value, isDropDownVisible: true }, () => {
      if (value === '') {
        this.setState({ isDropDownVisible: false, houses: [], housesSearchAddress: '' })
      } else if (isIncludingPrev) {        
        this.updateHousesLocally(value)
      } else {
        this.updateHouses()
      }
    })
  }

  updateHousesLocally(value) {
    const splitAddresses = value.toLowerCase().split(' ')
    const resHouses = []
    for (let i = 0; i < this.state.houses.length; ++i) {
      let houseAddress = this.state.houses[i].address.toLowerCase()
      let includesAll = true
      for (let j = 0; j < splitAddresses.length; ++j) {
        if (!houseAddress.includes(splitAddresses[j])) {
          includesAll = false
          break
        }
      }

      if (includesAll) {
        resHouses.push(this.state.houses[i])
      }
    }
    this.setState({ houses: resHouses, housesSearchAddress:value })
  }

  updateHouses() {
    const searchAddress = this.state.searchAddress
    fetch(`api/GeoData/GetFirstHousesByAddress/${searchAddress}/${SEARCH_ADDRESS_COUNT}`)
      .then(response => response.json())
      .then(data => {       
        if (this.state.searchAddress !== searchAddress) {  //пользователь уже ввел новый адрес       
          return
        }
        this.setState({ houses: data, housesSearchAddress:this.state.searchAddress })
      })
      .catch(ex => console.log(ex))
  }

  handleFormControlClick() {
    this.setState({ isDropDownVisible: true })
  }

  handleDropdownItemClick(e, house) {
    this.setState({ isDropDownVisible: false, searchAddress: house.address }, () => { this.updateHouses() })
    this.props.handleMenuSelected(house.houseId, true)
  }


  renderHouses() {
    return (
      <CustomMenu className='block-search'
        searchAddress={this.state.searchAddress}
        handleSearchAddressChange={this.handleSearchAddressChange}
        handleFormControlClick={this.handleFormControlClick}>
        {this.state.isDropDownVisible && this.state.houses.map(h => <Dropdown.Item
          key={h.houseId}
          onClick={(e) => { this.handleDropdownItemClick(e, h) }}
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
                {window.location.pathname === "/" && this.renderHouses()}
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
