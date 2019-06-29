import React from 'react';
import {HouseMenu} from './HouseMenu';
import {MyHome} from './MyHome';
import './House.css';

export class HouseComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            activeButton:"MyHome"
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(newValue){
        this.setState({activeButton:newValue})
    }


    render() {

        //let div = this.state.activeButton ? <div>1</div> :<div>2</div>
        let pageDiv = "";

        switch(this.state.activeButton) {
            case "ChangeTariff":
                pageDiv = <h1>Выбор тарифа</h1>
                break;
            case "ChangeUK":
                pageDiv = <h1>Выбор УК</h1>
                break;
            default:
                pageDiv = <MyHome />;
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