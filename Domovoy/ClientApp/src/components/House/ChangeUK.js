import React, { Component } from 'react';

export class ChangeUK extends Component {

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
                <h1>Выбор Управляющей компании</h1>
                
                <div>
                    Форма торгов?
                </div>
            </div>
        )
    }
}