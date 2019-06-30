import React, { Component } from 'react';

export class MyUK extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            houseData: this.props.houseData,
            auctionData: null,
        }
    }
    
    fetchDataAuction(id) {
        fetch(`api/GeoData/GetAuction/${id}`)
            .then(response =>
                response.json())
            .then(data => {
                this.setState({ auctionData: data });
            })
    }


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