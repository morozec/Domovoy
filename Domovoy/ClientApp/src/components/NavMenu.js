import React, { Component, useState, useEffect } from 'react';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

import logo from '../img/logo_domovoy.svg';

import { CustomMenu } from './CustomToggle'
import { SEARCH_ADDRESS_COUNT } from './../constants/constants'
import { Dropdown } from 'react-bootstrap'

import $ from 'jquery'

import { useAuth0 } from "../react-auth0-wrapper";

const NavMenu = (props) => {

  const [searchAddress, setSearchAddress] = useState('')
  const [housesSearchAddress, setHousesSearchAddress] = useState('')//адрес, на который были выцеплены дома из базы
  const [isDropDownVisible, setIsDropDownVisible] = useState(false)
  const [houses, setHouses] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)
 

  const handleSearchAddressChange = (value) => {
    setSearchAddress(value)
    setIsDropDownVisible(true)
  }

  useEffect(() => {
    if (searchAddress === ''){
      setIsDropDownVisible(false)
      setHouses([])
      setHousesSearchAddress('')
    }
    else if (!isUpdating){
      setIsUpdating(true)      
    }
  }, [searchAddress])

  useEffect(() => {
    if (isUpdating){
      updateHouses()
    }
  },[isUpdating])

  const updateHouses = () => {

    const isIncludingPrev =
      housesSearchAddress !== '' &&
      searchAddress.startsWith(housesSearchAddress) &&
      houses.length < SEARCH_ADDRESS_COUNT

    if (isIncludingPrev) {
      console.log('update localy')
      const splitAddresses = searchAddress.toLowerCase().split(' ')
      const resHouses = []
      for (let i = 0; i < houses.length; ++i) {
        let houseAddress = houses[i].address.toLowerCase()
        let includesAll = true
        for (let j = 0; j < splitAddresses.length; ++j) {
          if (!houseAddress.includes(splitAddresses[j])) {
            includesAll = false
            break
          }
        }

        if (includesAll) {
          resHouses.push(houses[i])
        }
      }
      setHouses(resHouses)
      setHousesSearchAddress(searchAddress)
      setIsUpdating(false)      
    }
    else {
      console.log('update remotely')
      const curSearchAddress = searchAddress
      fetch(`api/GeoData/GetFirstHousesByAddress/${curSearchAddress}/${SEARCH_ADDRESS_COUNT}`)
        .then(response => response.json())
        .then(data => {
          setHouses(data)
          setHousesSearchAddress(curSearchAddress)
          setIsUpdating(true)
        })
        .catch(ex => console.log(ex))
    }
  }

  useEffect(() => {
    if (housesSearchAddress !== searchAddress) {
      updateHouses()
    }
    else {
      setIsUpdating(false)      
    }
  }, [housesSearchAddress])


  const handleFormControlClick = () => {
    setIsDropDownVisible(true)    
  }

  const handleDropdownItemClick = (e, house) => {
    setIsDropDownVisible(false)
    setSearchAddress(house.address)
    props.handleMenuSelected(house.houseId, true)
  }    

  useEffect(() => { //component did mount    
    const searchDiv = $('#search-div')
    
    $(document).mouseup(function (e) {       
      if (!searchDiv.is(e.target) && $(e.target).parents('#search-div').length === 0) {     
        setIsDropDownVisible(false)       
      }
    })

    document.body.addEventListener('keydown', (e) => {     
      if (e.key === 'Escape'){
        setIsDropDownVisible(false)        
      }
    })
  }) 

  const renderHouses = () => {
    return (
      <CustomMenu className='block-search'
        searchAddress={searchAddress}
        handleSearchAddressChange={handleSearchAddressChange}
        handleFormControlClick={handleFormControlClick}
      >
        {isDropDownVisible && houses.map(h => <Dropdown.Item
          key={h.houseId}
          onClick={(e) => { handleDropdownItemClick(e, h) }}
        >
          {h.address}
        </Dropdown.Item>)}
      </CustomMenu>
    )
  }


 
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white">
          <Container>
            <div className="row w-100">
              <div className="col-lg-5">
                <NavbarBrand tag={Link} to="/">
                  <img src={logo} />
                </NavbarBrand>
                {window.location.pathname === "/" && renderHouses()}
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



export {NavMenu}