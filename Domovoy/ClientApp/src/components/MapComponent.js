import React from 'react'
import {OSM} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';

export class MapComponent extends React.Component{
    componentDidMount(){
        let map = new Map({        
            layers: [
                new TileLayer({
                    source: new OSM()
                }),                
            ],               
            overlays:[],
            target: 'map-container',
            view: new View({
                center:[0,0],
                zoom:2
            })
          });  
    }

    render(){
        return (
            <div id='map-container'></div>
        )
    }
}