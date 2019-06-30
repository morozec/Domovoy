import React, { Component } from 'react';

export class HouseMenu extends Component {

    constructor(props) {
        super(props)
        
        this.handleButtonClick = this.handleButtonClick.bind(this)

        
    }
    
    handleButtonClick(e, buttonTag){
        e.preventDefault();
        this.props.handleChange(buttonTag);
    }
   
    render() {
        
        return (

            <div className="nav flex-column nav-pills page-menu" aria-orientation="vertical">
                <a className={`nav-link page-menu-button ${this.props.activeButton == "MyHome" ? "active" : ""}`}  href="#Мой дом" onClick={ e => this.handleButtonClick(e, "MyHome")}>Мой дом</a>
                <a className={`nav-link page-menu-button ${this.props.activeButton == "MyUK" ? "active" : ""}`} href="#Моя УК" onClick={ e => this.handleButtonClick(e, "MyUK")}>Моя УК</a>
                <a className={`nav-link page-menu-button ${this.props.activeButton == "ChangeTariff" ? "active" : ""}`} href="#Выбор тарифа" onClick={ e => this.handleButtonClick(e, "ChangeTariff")}>Выбор тарифа</a>
                <a className={`nav-link page-menu-button ${this.props.activeButton == "Treatment" ? "active" : ""}`} href="#Обращения" onClick={ e => this.handleButtonClick(e, "Treatment")}>Обращения</a>
            </div>

        )
    }

    
}