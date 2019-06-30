import React, { Component } from 'react';

export class MyUK extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            houseData: this.props.houseData,
            actionBids: this.actionBids,
            auctionData: null,
        }


        this.fetchDataAuctionBids = this.fetchDataAuctionBids.bind(this)

        if (this.state.houseData != null)
            this.fetchDataAuctionBids(this.state.houseData.houseId)
    }
    
    fetchDataAuctionBids(id) {
        fetch(`api/GeoData/GetAuctionBids/${id}`)
            .then(response =>
                response.json())
            .then(data => {
                this.setState({ auctionBidsData: data });
            }).catch(ex => console.log(ex))
    }


    render() {
		
		console.log(this.state.auctionBidsData);
        let count = 0; 
        return (

            <div>
                <div className="house-block block-address">
                    <p className="block-address-caption">{this.state.houseData ? this.state.houseData.address : "..."}</p>
                </div>

                <div className="house-block">
                    
                    <p className="house-block-caption">{this.state.houseData ? "Стоимость обслуживания в прошлом году: " + this.state.houseData.maintenanceCost + "руб." : "..."} </p>
                    <p className="house-block-caption">{this.state.houseData && this.state.houseData.uk ? "Моя УК: " + this.state.houseData.uk.name + " (рейтинг " + this.state.houseData.uk.rank + ")" : "..."}</p>
					
                    <p className="block-link"><a href="123">ТЗ на обслуживание в 2020 году.docx</a></p>

                    <div className="block-holder">
                        <table className="table table-hover table-striped house-violations">
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Дата</th>
                                    <th>УК</th>
                                    <th>Рейтинг</th>
                                    <th>Ставка</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.auctionBidsData != null  ? this.state.auctionBidsData.map(v =>  <tr key={v.auctionBidId}><td>{++count}</td><td>{v.dateAddStr}</td><td>{v.organization.name}</td><td>{v.organization.rank}</td><td>{v.cost}</td></tr>) : <tr></tr>}
                            </tbody>
                        </table>
                        <p className="house-block-caption">
                            {this.state.auctionBidsData != null && this.state.auctionBidsData.length > 0 ? "Дата окончания аукциона: " + this.state.auctionBidsData[0].auction.dateEndStr : "В данный момент выборы УК не проводятся"}
                            </p>
                    </div>
                </div>
            </div>
        )
    }
}