import React from 'react';
import {HouseMenu} from './HouseMenu';
import {MyHome} from './MyHome';
import {MyUK} from './MyUK';
import {ChangeTariff} from './ChangeTariff';
import './House.css';

export class HouseComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            activeButton:"MyHome",
            id: this.props.match.params.id,
            houseData: null
        }

        this.handleChange = this.handleChange.bind(this)

        this.fetchDataHouse = this.fetchDataHouse.bind(this)
        
        this.fetchDataHouse(this.state.id)
    }


    fetchDataHouse(id) {
        fetch(`api/GeoData/GetHouse/${id}`)
            .then(response =>
                response.json())
            .then(data => {
                this.setState({ houseData: data });
            })
    }

    handleChange(newValue){
        this.setState({activeButton:newValue})
    }

 
    render() {
        

        let pageDiv = "";

        if (this.state.houseData)
            switch(this.state.activeButton) {
                case "ChangeTariff":
                    pageDiv = <ChangeTariff houseData={this.state.houseData}/>
                    break;
                case "MyUK":
                    pageDiv = <MyUK houseData={this.state.houseData}/>
                    break;
                default:
                    pageDiv = <MyHome houseData={this.state.houseData}/>;
            }

        return (
            <div id='component-root' className="house">
                <div className="row">
                    <div className="col-lg-4 bg-white">
                        <HouseMenu handleChange={this.handleChange} activeButton={this.state.activeButton} />
                    </div>
                    <div className="col-lg-8 house-page">
                        {pageDiv}
                    </div>
                </div>
            </div>
        )
    }
}