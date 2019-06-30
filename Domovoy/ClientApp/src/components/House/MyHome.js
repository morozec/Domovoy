import React, { Component } from 'react';
import testImg from '../../img/test.jpg';

export class MyHome extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            houseData: this.props.houseData,
            violationsData: null
        }

        this.fetchDataViolations = this.fetchDataViolations.bind(this)

        if (this.state.houseData != null)
            this.fetchDataViolations(this.state.houseData.houseId)
        
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
        console.log(this.state.violationsData);

        return (
            <div>
                <div className="d-flex justify-content-center house-block house-main">
                    <div className="house-main-img">
                        <img src={testImg} />
                    </div>
                    <div className="house-main-house">
                        <p className="house-main-caption">{this.state.houseData ? this.state.houseData.address : "..."}</p>

                        <div className="house-block-info">
                            
                            <div className="d-flex justify-content-around house-info-items">
                            
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
                    </div>

                    {/* <p className="house-block-caption">{this.state.houseData ? this.state.houseData.address : "..."}</p>
                    <p className="house-block-uk">{this.state.houseData && this.state.houseData.uk ? this.state.houseData.uk.name : "..."}</p> */}

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
                                {this.state.violationsData != null ? this.state.violationsData.map(v => <tr key={v.houseViolationId}><td>{v.violationDate}</td><td>{v.violationDescriptions}</td></tr>) : <tr></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}