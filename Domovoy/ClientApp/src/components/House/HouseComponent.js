import React from 'react';
import {HouseMenu} from './HouseMenu';
import {MyHome} from './MyHome';
import {ChangeUK} from './ChangeUK';
import {ChangeTariff} from './ChangeTariff';
import './House.css';

export class HouseComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            activeButton:"MyHome",
            id: this.props.match.params.id
        }

        this.handleChange = this.handleChange.bind(this)

        //console.log(this.props.match.params.id);
    }

    handleChange(newValue){
        this.setState({activeButton:newValue})
    }

    // fetchData(id) {

    //     console.log(id)

    //     fetch(`api/GeoData/GetGeoData/${id}`)
    //         .then(response =>
    //             response.json())
    //         .then(data => {
    //             console.log(data)
    //             this.setState({ geoData: data }, () => { this.showPopup() });
    //         })
    // }


    render() {

        //let div = this.state.activeButton ? <div>1</div> :<div>2</div>
        let pageDiv = "";

        switch(this.state.activeButton) {
            case "ChangeTariff":
                pageDiv = <ChangeTariff id={this.state.id}/>
                break;
            case "ChangeUK":
                pageDiv = <ChangeUK id={this.state.id}/>
                break;
            default:
                pageDiv = <MyHome id={this.state.id}/>;
        }

        return (
            <div id='component-root' className="house">
                <div className="row">
                    <div className="col-lg-4">
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