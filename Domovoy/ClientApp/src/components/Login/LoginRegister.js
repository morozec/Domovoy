import React, { useState } from 'react'
import ValidationLoginForm from './ValidationLoginForm'
import ValidationRegisterForm from './ValidationRegisterForm'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import './ValidationLoginForm.css'

const LoginRegister = () => {
    const [activeTab, setActiveTab] = useState('login')

    const toggle = (tab) => {
        setActiveTab(tab)
    }

    return (
        <div>
            <Nav tabs className='mt-2'>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'login' }, { navLink: true })} onClick={() => toggle('login')}>
                        Войти
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'register' }, { navLink: true })} onClick={() => toggle('register')}>
                        Регистрация
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent activeTab={activeTab} className='mt-2 mb-2' >
                <TabPane tabId="login">
                    <ValidationLoginForm/>
                </TabPane>
                <TabPane tabId="register">
                    <ValidationRegisterForm/>
                </TabPane>
            </TabContent>
           
        </div>

    )
}

export default LoginRegister