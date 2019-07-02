import React from 'react'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { Cluster, OSM, Vector as VectorSource } from 'ol/source.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Circle as CircleStyle, Fill, Stroke, Style, Text, Icon } from 'ol/style';
import { transform } from 'ol/proj.js'
import { ZoomToExtent } from 'ol/control.js';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import 'ol/ol.css';
import './MapComponent.css'

export class MapComponent extends React.Component {

    constructor(props) {
        super(props)
        this.showHousesMarkers = this.showHousesMarkers.bind(this)
    }

    getCoordinates(coordinates) {
        const projectionFrom = 'EPSG:4326';
        const projectionTo = 'EPSG:3857'; 
        let convertedCoordinates = transform(coordinates, projectionFrom, projectionTo)        
        return convertedCoordinates

    }

    showPopup() {      
        
        let coordinates = this.getCoordinates([this.props.house.posX, this.props.house.posY])
        if (!this.marker) {
            let marker = new Feature({
                type: 'icon',
                geometry: new Point(coordinates)
            })

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
                        fill: new Fill({ color: 'black' }),
                        stroke: new Stroke({
                            color: 'white', width: 2
                        })
                    })
                })
            }

            let markerLayer = new VectorLayer({
                source: new VectorSource({
                    features: [marker]
                }),
                style: function (feature) {

                    return styles[feature.get('type')];
                }
            });

            this.marker = marker
            this.markerLayer = markerLayer
            this.map.addLayer(markerLayer)
        }
        else {
            this.marker.getGeometry().setCoordinates(coordinates)
        }
        this.markerLayer.setVisible(true)


        let lowerCorner = this.getCoordinates([this.props.house.lowerCornerX, this.props.house.lowerCornerY])
        let upperCorner = this.getCoordinates([this.props.house.upperCornerX, this.props.house.upperCornerY])

        const ext = [lowerCorner[0], lowerCorner[1], upperCorner[0], upperCorner[1]]
        if (this.zoomToExtent)
            this.map.removeControl(this.zoomToExtent)
        this.zoomToExtent = new ZoomToExtent({ extent: ext })
        this.map.addControl(this.zoomToExtent)

        if (this.props.isSearched) {
            this.map.getView().fit(ext, this.map.getSize());
        }
    }

    showHousesMarkers() {
        fetch(`api/GeoData/GetHouses`)
            .then(response => response.json())
            .then(houses => {

                const projectionFrom = 'EPSG:4326';
                const projectionTo = 'EPSG:3857';

                const source = new VectorSource({
                    features: houses.map(h => {
                        const feature = new Feature(
                            new Point(transform([h.posX, h.posY], projectionFrom, projectionTo)))
                        feature.setId(h.houseId)
                        return feature
                    })
                })
                const clusterSource = new Cluster({
                    distance: 25,
                    source: source
                })

                var styleCache = {};
                const clustersLayer = new VectorLayer({
                    source: clusterSource,
                    style: function (feature) {
                        var size = feature.get('features').length;
                        var style = styleCache[size];
                        if (!style) {
                            if (size > 1) {

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
                            }
                            else {
                                style = new Style({
                                    image: new Icon({
                                        anchor: [0.5, 0.5],
                                        src: 'img/house_small.png'
                                    })
                                })
                            }
                            styleCache[size] = style;
                        }
                        return style;
                    }
                });

                this.map.addLayer(clustersLayer)

            })

    }


    componentDidMount() {

        let map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
            ],
            target: 'map-container',
            view: new View({
                center: [0, 0],
                zoom: 2
            })
        });

        const context = this
        map.on('click', function (evt) {


            let needClear = true
            map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {                
                const innerFeatures = feature.getProperties().features

                if (!innerFeatures || innerFeatures.length !== 1) {                    
                    return
                }
                needClear = false
                const id = innerFeatures[0].getId()
                context.props.updateHouse(id, false)        
            })

            if (needClear){  //0 || > 1    
                context.props.clearHouse()     
                
                if(context.markerLayer){
                    context.markerLayer.setVisible(false)
                }
            }
        })


        map.on("pointermove", function (evt) {
            var isSingleFeature = this.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
                const innerFeatures = feature.getProperties().features
                if (!innerFeatures) {
                    return false //в случае, если навели на маркер, отображающий не дом
                }
                return innerFeatures.length === 1
            });
            if (isSingleFeature) {
                this.getTargetElement().style.cursor = 'pointer';
            } else {
                this.getTargetElement().style.cursor = '';
            }
        })

        this.map = map
        this.showHousesMarkers();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.house.houseId !== prevProps.house.houseId) {
            this.showPopup()
        }
    }


    render() {

        let divDetails = <div className="details">

            <h3>Немного статистики</h3>

            <p className="detail-item">
                Управляющих организаций
            <span className="float-right">1 684</span>
            </p>

            <p className="detail-item">
                Домов
            <span className="float-right">22 577</span>
            </p>

            <p className="detail-item">
                Работ по домам за 2018 год
            <span className="float-right">18 316</span>
            </p>

            <p className="detail-item">
                Предписаний в адрес УК от надзорных органов
            <span className="float-right">35 579</span>
            </p>

        </div>;

        if (this.props.house.address) {

            divDetails = <div className="details">
                <h3>{this.props.house.address}</h3>

                <p className="detail-item">Стоимость обслуживания в мес. <span className="float-right">{`${this.props.house.maintenanceCost} руб`}</span></p>
                <p className="detail-item">Количество аварий в год <span className="float-right">{this.props.house.countAccident}</span></p>
                <p className="detail-item">Управляющая компания <br /><span>{this.props.house.uk && this.props.house.uk.name}</span></p>
                <p className="detail-item">Год постройки <span className="float-right">{this.props.house.buildYear}</span></p>

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
                    </div>
                </div>
            </div>
        )
    }
}