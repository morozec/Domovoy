import React from 'react'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { Cluster, OSM, Vector as VectorSource } from 'ol/source.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import OrderComponent from './OrderComponent'
import Overlay from 'ol/Overlay.js';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Circle as CircleStyle, Fill, Stroke, Style, Text , Icon} from 'ol/style';
import { transform, get, transformExtent } from 'ol/proj.js'
import { ZoomToExtent } from 'ol/control.js';
import { Form, Button, Input } from 'reactstrap';
import Polyline from 'ol/format/Polyline.js';
import { Link } from 'react-router-dom';


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
            geoData: {},
            searchAddress: '',
            house: {},
            houses: [],
            isDropDownVisible:true
        }

        this.toggle = this.toggle.bind(this)
        this.fetchData = this.fetchData.bind(this)      
        
    }

    /**
     * Calculate & Update state of new dimensions
     */
    updateDimensions() {
        this.map.updateSize();
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
            isNewUserRequest: true,
        })
    }

    toggle() {
        this.setState(prevState => ({
            isUserRequestFromShown: !prevState.isUserRequestFromShown
        }))
    }

    fetchData() {

        fetch(`api/GeoData/GetGeoData/${this.props.house.address}`)
            .then(response =>
                response.json())
            .then(data => {
                console.log(data)
                this.setState({ geoData: data }, () => {
                    this.showPopup()

                });
            })

    }

    getCoordinates(str, needConvert = true) {
        const projectionFrom = 'EPSG:4326';
        const projectionTo = 'EPSG:3857';
        let coordinates = str.split(" ").map(s => +s)
        if (needConvert) {
            coordinates = transform(coordinates, projectionFrom, projectionTo)
        }
        return coordinates

    }

    showPopup() {


        var content = document.getElementById('popup-content');
        let fm = this.state.geoData.response.GeoObjectCollection.featureMember[0]

        if (!fm) {
            return
        }

        const geoObject = fm.GeoObject
        content.innerText = this.props.house.address
        let coordinates = this.getCoordinates(geoObject.Point.pos)
        // this.overlay.setPosition(coordinates)
        if (!this.marker){
            let marker = new Feature({
                type:'icon',
                geometry:new Point(coordinates)
            })
    
            // marker.getGeometry().setCoordinates([-5701523.274225562, -3508003.9130105716])
    
            var styles = {            
                'icon': new Style({
                  image: new Icon({
                    anchor: [0.5, 1],
                    src: 'img/Sloy_x0020_1.png'
                  })
                }),
    
                'geoMarker': new Style({
                    image: new CircleStyle({
                      radius: 7,
                      fill: new Fill({color: 'black'}),
                      stroke: new Stroke({
                        color: 'white', width: 2
                      })
                    })
                })
            }
    
            var vectorLayer = new VectorLayer({
                source: new VectorSource({
                  features: [marker]
                }),
                style: function(feature) {
                  
                  return styles[feature.get('type')];
                }
              });
    
              this.marker = marker
            this.map.addLayer(vectorLayer)
        }
        else{
            this.marker.getGeometry().setCoordinates(coordinates)
        }
        
        

        let lowerCorner = this.getCoordinates(geoObject.boundedBy.Envelope.lowerCorner, true)
        let upperCorner = this.getCoordinates(geoObject.boundedBy.Envelope.upperCorner, true)

        const ext = [lowerCorner[0], lowerCorner[1], upperCorner[0], upperCorner[1]]
        if (this.zoomToExtent)
            this.map.removeControl(this.zoomToExtent)
        this.zoomToExtent = new ZoomToExtent({ extent: ext })
        this.map.addControl(this.zoomToExtent)


        //console.log(ext)
        this.map.getView().fit(ext, this.map.getSize());
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
        
        this.map = new Map({
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
        this.overlay = overlay        

        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentDidUpdate(prevProps,prevState){
        if (this.props.house.houseId != prevProps.house.houseId){
            this.fetchData()
        }
    }
    

render() {

    let divDetails = <div className="details">
        
        <h3>Имеющиеся данные</h3>

        <p className="detail-item">
            Управляющих организаций
            <span className="float-right">1 684</span>
        </p>

        <p className="detail-item">
            Домов
            <span className="float-right">22 577</span>
        </p>

        <p className="detail-item">
            Работ по домам за 2018-2019 год
            <span className="float-right">18 316</span>
        </p>

        <p className="detail-item">
            Предписаний в адрес УК от надзорных органов
            <span className="float-right">35 579</span>
        </p>        

    </div>;

    if (this.props.house.address != null) {

        divDetails = <div className="details">
        <h3>{this.props.house.address}</h3>

        <p className="detail-item">Стоимость обслуживания в мес. <span className="float-right">{`${this.props.house.maintenanceCost} руб`}</span></p>
        <p className="detail-item">Количество аварий в год <span className="float-right">{this.props.house.countAccident}</span></p>
        <p className="detail-item">Управляющая компания <br/><span>{this.props.house.uk && this.props.house.uk.name}</span></p>
        <p className="detail-item">Год постройки <span  className="float-right">{this.props.house.buildYear}</span></p>

        <Link to={`/House/${this.props.house.houseId}`}>
            <Button color="primary" className="detail-button">Подробнее</Button>
        </Link>
        </div>;
        console.log(divDetails);
    }
    
    return (

        <div id='component-root'>
                <div className='row'>
                    <div className='col-lg-5 bg-white'>
                        {divDetails}
                    </div>
                    <div className='col-lg-7 p-0'>
                        <div id='map-container'></div>
                        <div id="popup" className="ol-popup">
                            <a href="#" id="popup-closer" className="ol-popup-closer"></a>
                            <div id="popup-content"></div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
}