import React, { Component } from 'react';

export class MyHome extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            houseData: null,
            violationsData: null
        }

        this.fetchDataHouse = this.fetchDataHouse.bind(this)
        this.fetchDataViolations = this.fetchDataViolations.bind(this)

        this.fetchDataHouse(this.props.id)
        this.fetchDataViolations(this.props.id)

        
    }
    

    fetchDataHouse(id) {
        fetch(`api/GeoData/GetHouse/${id}`)
            .then(response =>
                response.json())
            .then(data => {
                this.setState({ houseData: data });
            })
    }

    
    fetchDataViolations(id) {
        fetch(`api/GeoData/GetHouseViolations/${id}`)
            .then(response =>
                response.json())
            .then(data => {
                this.setState({ violationsData: data });
            })
    }

    render() {

        //console.log(this.state.houseData);
        //console.log(this.state.violationsData);

        return (
            <div>
                <div className="house-block">
                    <p className="house-block-caption">{this.state.houseData ? this.state.houseData.address : "..."}</p>
                    <p className="house-block-uk">{this.state.houseData && this.state.houseData.uk ? this.state.houseData.uk.name : "..."}</p>
                </div>

                <div className="house-block house-block-info">
                    <p className="house-block-caption">Информация по дому:</p>
                    <div className="d-flex justify-content-center house-info-items">
                    
                    <div className="house-info-item">
                        <span className="house-info-item-title">Построен </span>
                        <span className="house-info-item-data">{this.state.houseData ? this.state.houseData.buildYear : "-"}</span>
                    </div>

                    <div className="house-info-item">
                        <span className="house-info-item-title">Этажей </span>
                        <span className="house-info-item-data">{this.state.houseData ? this.state.houseData.maxFloor : "-"}</span>
                    </div>

                    <div className="house-info-item">
                        <span className="house-info-item-title">Квартир </span>
                        <span className="house-info-item-data">{this.state.houseData ? this.state.houseData.numberApartments : "-"}</span>
                    </div>

                    <div className="house-info-item">
                        <span className="house-info-item-title">Жилая площадь </span>
                        <span className="house-info-item-data">{this.state.houseData ? this.state.houseData.areaLiving + " кв.м" : "-"}</span>
                    </div>

                    <div className="house-info-item">
                        <span className="house-info-item-title">Износ </span>
                        <span className="house-info-item-data">{this.state.houseData ? this.state.houseData.physicalWear + "%" : "-"}</span>
                    </div>                    

                    </div>
                </div>

                <div className="house-block">
                    <p className="house-block-caption">Выполненные работы</p>
                </div>

                <div className="house-block"> 
                    <p className="house-block-caption">Нарушения / Предписания [{this.state.violationsData ? this.state.violationsData.length : "0"}]</p>
                    <div className="block-holder">
                        <table className="table table-hover table-striped house-violations">
                            <thead>
                                <tr>
                                    <th>Дата</th>
                                    <th>Описание</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.violationsData ? this.state.violationsData.map(v => <tr><td>{v.violationDate}</td><td>{v.violationDescriptions}</td></tr>) : <tr></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}