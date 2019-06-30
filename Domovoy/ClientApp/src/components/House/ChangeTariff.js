import React, { Component } from 'react';

export class ChangeTariff extends Component {

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
                 <div className="house-block">
                    <p className="house-block-caption">{this.state.houseData ? this.state.houseData.address : "..."}</p>
                    <p className="house-block-uk">{this.state.houseData && this.state.houseData.uk ? this.state.houseData.uk.name : "..."}</p>
				</div>
            </div>
        )
    }
}