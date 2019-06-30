import React, { Component } from 'react';

export class MyHome extends Component {

    constructor(props) {
        super(props)
        
        //this.handleButtonClick = this.handleButtonClick.bind(this)
    }
    

    // handleButtonClick(e, buttonTag){

    //     e.preventDefault();

    //     this.props.handleChange(false);
        
    //     console.log(buttonTag);
    // }

    render() {
        return (
            <div>
                <h1>Мой дом</h1>

                <div className="house-myhouse-address">
                    Адрес и управляющая компания
                </div>

                <div className="house-myhouse-info">
                    Информация по дому
                </div>

                <div className="house-myhouse-jobs">
                    Выполненные работы
                </div>

                <div className="house-myhouse-violations"> 
                    Нарушения / Предписания
                </div>

            </div>
        )
    }
}