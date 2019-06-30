import React, { Component } from 'react';

export class ChangeUK extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
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
                <h1>Выбор Управляющей компании</h1>
                
                <div>
                    Форма торгов?
                </div>
            </div>
        )
    }
}