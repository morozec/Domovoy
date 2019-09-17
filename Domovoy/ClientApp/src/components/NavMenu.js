import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, Collapse, Container, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

import logo from '../img/logo_domovoy.svg';

import { CustomMenu } from './CustomToggle'
import { SEARCH_ADDRESS_COUNT } from './../constants/constants'
import { Dropdown } from 'react-bootstrap'

import $ from 'jquery'

import { withRouter } from 'react-router-dom'
import LoginRegister from './Login/LoginRegister'
import AuthHelper from './Login/AuthHelper'


const NavMenu = (props) => {

  const [searchAddress, setSearchAddress] = useState('')
  const [housesSearchAddress, setHousesSearchAddress] = useState('')//адрес, на который были выцеплены дома из базы
  const [isDropDownVisible, setIsDropDownVisible] = useState(false)
  const [houses, setHouses] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isLogged, setIsLogged] = useState(AuthHelper.isLogged())
  const [login, setLogin] = useState(AuthHelper.getLogin())



  const handleSearchAddressChange = (value) => {
    setSearchAddress(value)
    setIsDropDownVisible(true)
  }

  useEffect(() => {
    if (searchAddress === '') {
      setIsDropDownVisible(false)
      setHouses([])
      setHousesSearchAddress('')
    }
    else if (!isUpdating) {
      setIsUpdating(true)
    }
  }, [searchAddress])

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
  }, [housesSearchAddress, isUpdating])


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

    const onMouseup = (e) => {
      if (!searchDiv.is(e.target) && $(e.target).parents('#search-div').length === 0) {
        setIsDropDownVisible(false)
      }
    }

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDropDownVisible(false)
      }
    }

    document.addEventListener('mouseup', onMouseup)
    document.body.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('mouseup', onMouseup)
      document.body.removeEventListener('keydown', onKeyDown)
    }
  })

  const renderHouses = () => {
    return (
      <CustomMenu className='col-lg-5'
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

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen)
  }


  const routeToProfile = () => {
    setIsOpen(false)
    props.history.push('/profile')
  }

  const handleLogin = () => {
    setIsLoginOpen(false)
    setIsLogged(AuthHelper.isLogged())
    setLogin(AuthHelper.getLogin())
  }

  const handleLogout = () => {
    AuthHelper.clearAuth()
    setIsLogged(AuthHelper.isLogged())
    setLogin(AuthHelper.getLogin())
  }

  return (
    <header>
      <Navbar expand="sm">
        <Container>
          <NavbarBrand tag={Link} to="/">
            <img src={logo} alt="Домовой" />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} className='navbar-dark'></NavbarToggler>

          <Collapse isOpen={isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink tag={Link} to="/" className="header-menu-item">О ПРОЕКТЕ</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/" className="header-menu-item">РЕЙТИНГ ДОМОВ</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/" className="header-menu-item">ЗАДАТЬ ВОПРОС</NavLink>
              </NavItem>

              {!isLogged && (
                <NavItem>
                  <NavLink tag={Link} to='/' onClick={() => setIsLoginOpen(true)} className="header-menu-item">ВОЙТИ/РЕГИСТРАЦИЯ</NavLink>
                </NavItem>
              )}

              {isLogged && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret className="header-menu-item">
                    {login}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={routeToProfile}>
                      {/* <NavLink tag={Link} to="/profile">ЛИЧНЫЙ КАБИНЕТ</NavLink>                      */}
                      Личный кабинет
                      </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={handleLogout}>
                      Выйти
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}

            </Nav>
          </Collapse>
        </Container>
      </Navbar>

      <Container className='p-0'>
        {window.location.pathname === "/" && renderHouses()}
      </Container>

      <Modal isOpen={isLoginOpen} toggle={toggleLogin}>
        <ModalBody>
          <LoginRegister handleLogin = {handleLogin}/>
        </ModalBody>
      </Modal>
    </header>
  )
}

export default withRouter(NavMenu) 