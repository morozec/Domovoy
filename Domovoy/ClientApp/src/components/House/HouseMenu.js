import React, { Component } from 'react';

export class HouseMenu extends Component {

    constructor(props) {
        super(props)
        
        this.handleButtonClick = this.handleButtonClick.bind(this)
    }
    
    // componentDidUpdate() {
    //событие при вызове обновления компонента
    // }

    handleButtonClick(e, buttonTag){
        e.preventDefault();
        this.props.handleChange(buttonTag);
    }

    render() {
        
        //метка на выбранную кнопку
        let MyHomeActive = this.props.activeButton == "MyHome" ? "active" : "";
        let ChangeTariffActive = this.props.activeButton == "ChangeTariff" ? "active" : "";
        let ChangeUKActive = this.props.activeButton == "ChangeUK" ? "active" : "";
        
        return (

            <div className="nav flex-column nav-pills house-menu" aria-orientation="vertical">
                <a className={`nav-link house-menu-button ${MyHomeActive}`}  href="#Мой дом" onClick={ e => this.handleButtonClick(e, "MyHome")}>Мой дом</a>
                <a className={`nav-link house-menu-button ${ChangeTariffActive}`} href="#Выбор тарифа" onClick={ e => this.handleButtonClick(e, "ChangeTariff")}>Выбор тарифа</a>
                <a className={`nav-link house-menu-button ${ChangeUKActive}`} href="#Выбор УК" onClick={ e => this.handleButtonClick(e, "ChangeUK")}>Выбор УК</a>

                <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                </div>

            </div>

        )
    }
}