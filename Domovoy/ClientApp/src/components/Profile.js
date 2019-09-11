import React, { useState, useEffect } from 'react'
import { useAuth0, Auth0Provider } from '../react-auth0-wrapper'
import Loading from './Loading'
import { CustomMenu } from './CustomToggle'

import { Container, Row, Col, Media, Nav, NavItem, NavLink, TabContent, TabPane, Button, Form, Input, FormGroup, Label } from 'reactstrap'
import { Dropdown } from 'react-bootstrap'
import { SEARCH_ADDRESS_COUNT } from './../constants/constants'

import classnames from 'classnames';
// import createAuth0Client from "@auth0/auth0-spa-js";
// import config from "./../auth_config.json";

const Profile = () => {  
  const {user, loading} = useAuth0()
  const [activeTab, setActiveTab] = useState('myData')

  const [houses, setHouses] = useState([])
  const [searchAddress, setSearchAddress] = useState('')
  const [housesSearchAddress, setHousesSearchAddress] = useState('')//адрес, на который были выцеплены дома из базы
  const [isDropDownVisible, setIsDropDownVisible] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false) 

  if (loading || !user) {
    return <Loading />
  } 

  useEffect(() => {
    console.log(user)
    const metaData = user['http://localhost:3000/user_metadata']
    if (metaData && metaData.address){
      setSearchAddress(metaData.address)
    }  
  }, [])
  
  const handleFormControlClick = () => {
    setIsDropDownVisible(true)
  }

  const handleDropdownItemClick = (e, house) => {
    setIsDropDownVisible(false)
    setSearchAddress(house.address)    
  }


  const handleSearchAddressChange = (value) => {

    setSearchAddress(value)
    setIsDropDownVisible(true)
  }

  useEffect(() => {
    console.log(isUpdating)
    if (searchAddress === '') {
      setIsDropDownVisible(false)
      setHouses([])
      setHousesSearchAddress('')
    }
    else if (!isUpdating) {
      setIsUpdating(true)
    }
  }, [searchAddress])

  useEffect(() => {
    if (housesSearchAddress !== searchAddress) {
      updateHouses()
    }
    else {
      setIsUpdating(false)
    }
  }, [housesSearchAddress, isUpdating])

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

  const toggle = (tab) => {
    setActiveTab(tab)
  }

  const saveProfile = () => {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1VWkJOa1UyTjBJNVJqRTBNRUpHT1RoRVFVVXpSVE5DTkVSQ056QTRSRVkzTlRKQ04wTkNPQSJ9.eyJpc3MiOiJodHRwczovL21vcm96ZWMuYXV0aDAuY29tLyIsInN1YiI6IkVqN1c2OGEzUHp6UkI0Z2Z1OU4xMTFjZEFlSmdGNmFHQGNsaWVudHMiLCJhdWQiOiJodHRwczovL21vcm96ZWMuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE1NjgxOTc4NzQsImV4cCI6MTU2ODI4NDI3NCwiYXpwIjoiRWo3VzY4YTNQenpSQjRnZnU5TjExMWNkQWVKZ0Y2YUciLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.DD6Kcc26mZlIW9-o8UfoytoKB0rINCEySDyFdXFPi1mq6T4hADzny3p5JzmNAZVjcS48ywEwev-NJzb7VBrYKgHCN9WTfLheH9KHaG5ZaVTDKacRAjLhDqpcs27FHtFYD0NRhJiSmKQdsWI37RHwXxRytIb_AgqRatfMYU7bswy7XIyeY6akqLc1dMAqHeJeXyf9vsZruyAvvA2PAmt-v_oH0J9FXma_GSPvOPZlZQ3oZeLvWFFw0MieRx2qd_kuF23flaKLrflcp8K2rKzZbnttKFo8863SQRme5wzzkeZLy8XPUVlwfY2tQLzac_5fWxfuOZGGCOKjBm-M9MJd-A'

    const user_metadata = {
      user_metadata: {
        address: searchAddress
      }
    }
   
    fetch(`https://morozec.auth0.com/api/v2/users/${user.sub}`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify(user_metadata)
    }).then(() =>{
      //await updateUser()
      // const auth0FromHook = await createAuth0Client({
      //   domain:config.domain,
      //   client_id:config.clientId
      // });
      // const user = await auth0FromHook.getUser();
     
      console.log(user)    
    } );
  }

  return (

    <div>
      <Nav tabs className='mt-2'>
        <NavItem>
          <NavLink className={classnames({ active: activeTab === 'myData' }, { navLink: true })} onClick={() => toggle('myData')}>
            Мои данные
                    </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={classnames({ active: activeTab === 'myOrders' }, { navLink: true })} onClick={() => toggle('myOrders')}>
            Мои заявки
                    </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab} className='mt-2 mb-2' >
        <TabPane tabId="myData">
          <Row>
            <Col>
              <Media>
                <Media body>
                  <Media heading>
                    {user.name}
                  </Media>


                  <Form>

                    <FormGroup row className='mr-2'>
                      <Label for="email" sm={2}>Email</Label>
                      <Col sm={10}>
                        <Input id="email" readOnly className='form-control-plaintext' value={user.email} />
                      </Col>
                    </FormGroup>


                    <FormGroup row className='mr-2'>
                      <Label for="address" sm={2}>Адрес</Label>
                      <Col sm={10}>
                        <CustomMenu className='block-search'
                          searchAddress={searchAddress}
                          handleSearchAddressChange={handleSearchAddressChange}
                          handleFormControlClick={handleFormControlClick}
                        >
                          {isDropDownVisible && houses.map(h =>
                            <Dropdown.Item
                              key={h.houseId}
                              onClick={(e) => { handleDropdownItemClick(e, h) }}
                            >
                              {h.address}
                            </Dropdown.Item>)}
                        </CustomMenu>
                      </Col>
                    </FormGroup>

                    <div className="row">
                      <div className="col-sm-10 offset-sm-2">
                        <Button type='button' color='primary' onClick={saveProfile}>Сохранить</Button>
                      </div>
                    </div>


                  </Form>
                </Media>

                <Media right top>
                  <Media object src={user.picture} alt="Profile" />
                </Media>
              </Media>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="myOrders">
          <Row>
            <Col sm="12">
              <p>Раздел находится в разработке</p>
            </Col>
          </Row>
        </TabPane>

      </TabContent>

    </div>



  )
}

export default Profile