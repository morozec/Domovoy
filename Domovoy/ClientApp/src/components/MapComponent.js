import React from 'react'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import {Cluster, OSM, Vector as VectorSource} from 'ol/source.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import OrderComponent from './OrderComponent'
import Overlay from 'ol/Overlay.js';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';
import {transform, get} from 'ol/proj.js'

import { EPSG3857_X_MIN, EPSG3857_Y_MIN, EPSG3857_X_MAX, EPSG3857_Y_MAX } from '../constants/constants'

import 'ol/ol.css';
import './MapComponent.css'

export class MapComponent extends React.Component {

    constructor(props) {
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
            geoData: {}        
        }

        this.toggle = this.toggle.bind(this)
        this.fetchData = this.fetchData.bind(this)
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

    toggle() {
        this.setState(prevState => ({
            isUserRequestFromShown: !prevState.isUserRequestFromShown
        }))
    }

    fetchData(address){
        console.log(address)
        fetch(`api/GeoData/GetGeoData/${address}`)
              .then(response => 
                response.json())
              .then(data => {
                  console.log(data)
                  this.setState({ geoData: data }, () =>  {this.showPopup()});  
              })
              
      }

    showPopup(){
        const projectionFrom = 'EPSG:4326';
        const projectionTo = 'EPSG:3857';

        var content = document.getElementById('popup-content');
        let fm = this.state.geoData.response.GeoObjectCollection.featureMember[0]

        if (!fm){
            return
        }

        const geoObject = fm.GeoObject
        content.innerText = geoObject.name
        let coordinates = geoObject.Point.pos.split(" ").map(s => +s)
        coordinates = transform(coordinates, projectionFrom, projectionTo)
        console.log(coordinates)
        this.overlay.setPosition(coordinates)
        
    }

    showMarkers() {
        this.map.removeLayer(this.clustersLayer)

        const urFeatures = []
        for (let i = 0; i < this.state.datas.length; ++i) {
            const data = this.state.datas[i]
            const coordinates = [data.x, data.y]
            const feature = new Feature(new Point(coordinates))
            feature.setId(data.id)
            urFeatures.push(feature)
        }
        const source = new VectorSource({
            features: urFeatures
        })
        const clusterSource = new Cluster({
            distance: 40,
            source: source
        })

        var styleCache = {};
        this.clustersLayer = new VectorLayer({
            source: clusterSource,
            style: function (feature) {
                var size = feature.get('features').length;
                var style = styleCache[size];
                if (!style) {
                    style = new Style({
                        image: new CircleStyle({
                            radius: 10,
                            stroke: new Stroke({
                                color: '#fff'
                            }),
                            fill: new Fill({
                                color: '#3399CC'
                            })
                        }),
                        text: new Text({
                            text: size.toString(),
                            fill: new Fill({
                                color: '#fff'
                            })
                        })
                    });
                    styleCache[size] = style;
                }
                return style;
            }
        });

        this.map.addLayer(this.clustersLayer)
    }

    componentDidMount() {
        let container = document.getElementById('popup');        
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

        this.clustersLayer = new VectorLayer({})
        let map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                this.clustersLayer
            ],
            overlays: [overlay],
            target: 'map-container',
            view: new View({
                center: [0, 0],
                zoom: 2
            })
        });
        this.overlay = overlay
        
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.searchAddress != prevProps.searchAddress && 
            this.props.searchAddress !== ''){
            this.fetchData(this.props.searchAddress)
        }
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