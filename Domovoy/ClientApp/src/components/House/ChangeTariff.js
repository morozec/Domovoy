import React, { Component } from 'react';

export class ChangeTariff extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            houseData : this.props.houseData
        }
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
                <div className="house-block block-address">
                    <p className="block-address-caption">{this.state.houseData ? this.state.houseData.address : "..."}</p>
                </div>
            </div>
        )
    }
}