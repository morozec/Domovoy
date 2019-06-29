import React from 'react'
import { OSM } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import OrderComponent from './OrderComponent'
import Overlay from 'ol/Overlay.js';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';

import { EPSG3857_X_MIN, EPSG3857_Y_MIN, EPSG3857_X_MAX, EPSG3857_Y_MAX } from '../constants/constants'

import 'ol/ol.css';

export class MapComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isUserRequestFromShown: false,
            isNewUserRequest: true,
            userName: '',
            userTel: '',
            requestHeader: '',
            requestBody: '',
            X: 0,
            Y: 0,
            userRequests: []
        }

        this.toggle = this.toggle.bind(this)
    }
    

    handleChange(event) {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit() {
        console.log(this.state.userName, this.state.userTel, this.state.requestHeader, this.state.requestBody, this.state.X, this.state.Y)
    }

    handleMapClick(coordinate) {
        this.setState({ 
            isUserRequestFromShown: true, 
            userName: '', 
            userTel: '', 
            requestHeader: '', 
            requestBody: '', 
            X: coordinate[0], 
            Y: coordinate[1], 
            isNewUserRequest: true 
        })
    }

    toggle(){
        this.setState(prevState => ({
          isUserRequestFromShown: !prevState.isUserRequestFromShown
        }))        
      }

    componentDidMount() {
        let container = document.getElementById('popup');
        var content = document.getElementById('popup-content');
        let closer = document.getElementById('popup-closer');

        let overlay = new Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });


        closer.onclick = function () {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };

        let map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
            ],
            overlays: [overlay],
            target: 'map-container',
            view: new View({
                center: [0, 0],
                zoom: 2
            })
        });

        const context = this
        map.on('click', function (evt) {
            let coordinate = evt.coordinate
            let featuresCount = 0
            map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
                // if (!this.isAuthenticated){
                //   content.innerText = "Необходима авторизация для просмотра заявок."
                //   overlay.setPosition(coordinate)
                //   return
                // }

                featuresCount++
                const innerFeatures = feature.getProperties().features
                if (innerFeatures.length > 1) {
                    content.innerText = "В выбранную область попадает несколько заявок. Приблизьтесь и выберете одну зявку."
                    overlay.setPosition(coordinate)
                } else {
                    const id = innerFeatures[0].getId()
                    fetch(`api/UserRequest/GetUserRequest/${id}`)
                        .then(response => response.json())
                        .then(data => {
                            context.setState({
                                userName: data.userName,
                                userTel: data.userTel,
                                requestHeader: data.requestHeader,
                                requestBody: data.requestBody,
                                isUserRequestFromShown: true,
                                isNewUserRequest: false
                            })
                        });
                }
            })

            if (featuresCount === 0) {
                const x = coordinate[0]
                const correctX = x > 0 ? x % EPSG3857_X_MAX : x % EPSG3857_X_MIN
                const y = coordinate[1]
                const correctY = y > 0 ? y % EPSG3857_Y_MAX : y % EPSG3857_Y_MIN
                context.handleMapClick([correctX, correctY])
            }
        })
    }

    render() {
        return (

            <div id='component-root'>
                <OrderComponent
                    isUserRequestFromShown={this.state.isUserRequestFromShown}
                    userName={this.state.userName}
                    userTel={this.state.userTel}
                    requestHeader={this.state.requestHeader}
                    requestBody={this.state.requestBody}
                    toggle={this.toggle}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    isNewUserRequest={this.state.isNewUserRequest}
                />
                <div id='map-container'></div>
                <div id="popup" className="ol-popup">
                    <a href="#" id="popup-closer" className="ol-popup-closer"></a>
                    <div id="popup-content"></div>
                </div>
            </div>
        )
    }
}