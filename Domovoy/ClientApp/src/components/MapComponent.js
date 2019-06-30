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
        this.overlay.setPosition(coordinates)

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


        var polyline = [
            'hldhx@lnau`BCG_EaC??cFjAwDjF??uBlKMd@}@z@??aC^yk@z_@se@b[wFdE??wFfE}N',
            'fIoGxB_I\\gG}@eHoCyTmPqGaBaHOoD\\??yVrGotA|N??o[N_STiwAtEmHGeHcAkiA}^',
            'aMyBiHOkFNoI`CcVvM??gG^gF_@iJwC??eCcA]OoL}DwFyCaCgCcCwDcGwHsSoX??wI_E',
            'kUFmq@hBiOqBgTwS??iYse@gYq\\cp@ce@{vA}s@csJqaE}{@iRaqE{lBeRoIwd@_T{]_',
            'Ngn@{PmhEwaA{SeF_u@kQuyAw]wQeEgtAsZ}LiCarAkVwI}D??_}RcjEinPspDwSqCgs@',
            'sPua@_OkXaMeT_Nwk@ob@gV}TiYs[uTwXoNmT{Uyb@wNg]{Nqa@oDgNeJu_@_G}YsFw]k',
            'DuZyDmm@i_@uyIJe~@jCg|@nGiv@zUi_BfNqaAvIow@dEed@dCcf@r@qz@Egs@{Acu@mC',
            'um@yIey@gGig@cK_m@aSku@qRil@we@{mAeTej@}Tkz@cLgr@aHko@qOmcEaJw~C{w@ka',
            'i@qBchBq@kmBS{kDnBscBnFu_Dbc@_~QHeU`IuyDrC_}@bByp@fCyoA?qMbD}{AIkeAgB',
            'k_A_A{UsDke@gFej@qH{o@qGgb@qH{`@mMgm@uQus@kL{_@yOmd@ymBgwE}x@ouBwtA__',
            'DuhEgaKuWct@gp@cnBii@mlBa_@}|Asj@qrCg^eaC}L{dAaJ_aAiOyjByH{nAuYu`GsAw',
            'Xyn@ywMyOyqD{_@cfIcDe}@y@aeBJmwA`CkiAbFkhBlTgdDdPyiB`W}xDnSa}DbJyhCrX',
            'itAhT}x@bE}Z_@qW_Kwv@qKaaAiBgXvIm}A~JovAxCqW~WanB`XewBbK{_A`K}fBvAmi@',
            'xBycBeCauBoF}}@qJioAww@gjHaPopA_NurAyJku@uGmi@cDs[eRaiBkQstAsQkcByNma',
            'CsK_uBcJgbEw@gkB_@ypEqDoqSm@eZcDwjBoGw`BoMegBaU_`Ce_@_uBqb@ytBwkFqiT_',
            'fAqfEwe@mfCka@_eC_UmlB}MmaBeWkkDeHwqAoX}~DcBsZmLcxBqOwqE_DkyAuJmrJ\\o',
            '~CfIewG|YibQxBssB?es@qGciA}RorAoVajA_nAodD{[y`AgPqp@mKwr@ms@umEaW{dAm',
            'b@umAw|@ojBwzDaaJsmBwbEgdCsrFqhAihDquAi`Fux@}_Dui@_eB_u@guCuyAuiHukA_',
            'lKszAu|OmaA{wKm}@clHs_A_rEahCssKo\\sgBsSglAqk@yvDcS_wAyTwpBmPc|BwZknF',
            'oFscB_GsaDiZmyMyLgtHgQonHqT{hKaPg}Dqq@m~Hym@c`EuiBudIabB{hF{pWifx@snA',
            'w`GkFyVqf@y~BkoAi}Lel@wtc@}`@oaXi_C}pZsi@eqGsSuqJ|Lqeb@e]kgPcaAu}SkDw',
            'zGhn@gjYh\\qlNZovJieBqja@ed@siO{[ol\\kCmjMe\\isHorCmec@uLebB}EqiBaCg}',
            '@m@qwHrT_vFps@kkI`uAszIrpHuzYxx@e{Crw@kpDhN{wBtQarDy@knFgP_yCu\\wyCwy',
            'A{kHo~@omEoYmoDaEcPiuAosDagD}rO{{AsyEihCayFilLaiUqm@_bAumFo}DgqA_uByi',
            '@swC~AkzDlhA}xEvcBa}Cxk@ql@`rAo|@~bBq{@``Bye@djDww@z_C_cAtn@ye@nfC_eC',
            '|gGahH~s@w}@``Fi~FpnAooC|u@wlEaEedRlYkrPvKerBfYs}Arg@m}AtrCkzElw@gjBb',
            'h@woBhR{gCwGkgCc[wtCuOapAcFoh@uBy[yBgr@c@iq@o@wvEv@sp@`FajBfCaq@fIipA',
            'dy@ewJlUc`ExGuaBdEmbBpBssArAuqBBg}@s@g{AkB{bBif@_bYmC}r@kDgm@sPq_BuJ_',
            's@{X_{AsK_d@eM{d@wVgx@oWcu@??aDmOkNia@wFoSmDyMyCkPiBePwAob@XcQ|@oNdCo',
            'SfFwXhEmOnLi\\lbAulB`X_d@|k@au@bc@oc@bqC}{BhwDgcD`l@ed@??bL{G|a@eTje@',
            'oS~]cLr~Bgh@|b@}Jv}EieAlv@sPluD{z@nzA_]`|KchCtd@sPvb@wSb{@ko@f`RooQ~e',
            '[upZbuIolI|gFafFzu@iq@nMmJ|OeJn^{Qjh@yQhc@uJ~j@iGdd@kAp~BkBxO{@|QsAfY',
            'gEtYiGd]}Jpd@wRhVoNzNeK`j@ce@vgK}cJnSoSzQkVvUm^rSgc@`Uql@xIq\\vIgg@~k',
            'Dyq[nIir@jNoq@xNwc@fYik@tk@su@neB}uBhqEesFjoGeyHtCoD|D}Ed|@ctAbIuOzqB',
            '_}D~NgY`\\um@v[gm@v{Cw`G`w@o{AdjAwzBh{C}`Gpp@ypAxn@}mAfz@{bBbNia@??jI',
            'ab@`CuOlC}YnAcV`@_^m@aeB}@yk@YuTuBg^uCkZiGk\\yGeY}Lu_@oOsZiTe[uWi[sl@',
            'mo@soAauAsrBgzBqgAglAyd@ig@asAcyAklA}qAwHkGi{@s~@goAmsAyDeEirB_{B}IsJ',
            'uEeFymAssAkdAmhAyTcVkFeEoKiH}l@kp@wg@sj@ku@ey@uh@kj@}EsFmG}Jk^_r@_f@m',
            '~@ym@yjA??a@cFd@kBrCgDbAUnAcBhAyAdk@et@??kF}D??OL'
          ].join('');
    
          var route = /** @type {module:ol/geom/LineString~LineString} */ (new Polyline({
            factor: 1e6
          }).readGeometry(polyline, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
          }));

          var routeCoords = route.getCoordinates();
    

        let marker = new Feature({
            type:'icon',
            geometry:new Point(routeCoords[0])
        })

        var styles = {            
            'icon': new Style({
              image: new Icon({
                anchor: [0.5, 1],
                src: '../img/Sloy_x0020_1.png'
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

        console.log(marker)

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
        this.map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                this.clustersLayer,
                vectorLayer
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

    componentDidUpdate(prevProps,prevState){
        if (this.props.house.houseId != prevProps.house.houseId){
            this.fetchData()
        }
    }

    

    

render() {
    return (

        <div id='component-root'>

            <div className='container'>
                <div className='row'>
                    <div className='col-lg-5'>
                                     
                        {this.props.house.address &&
                        <div>
                            <h3>{this.props.house.address}</h3>
                            <span>Стоимость обслуживания в мес.</span> <p>{`${this.props.house.maintenanceCost}руб`}</p>
                            <span>Количество аварий в год</span> <p>{this.props.house.countAccident}</p>
                            <span>Управляющая компания</span> <p>{this.props.house.uk && this.props.house.uk.name}</p>
                            <span>Год постройки</span> <p>{this.props.house.BuildYear}</p>


                            <p>Сравнить стоимость обслуживания</p>
                            <Link to={`/House/${this.props.house.houseId}`}>
                                <Button color="info">Понизить цену</Button>
                            </Link>
                            <Link to={`/House/${this.props.house.houseId}`}>
                                <Button color="primary">Повысить качество</Button>
                            </Link>
                        </div>}

                        
                        
                    </div>
                    <div className='col-lg-7'>
                        <div id='map-container'></div>
                        <div id="popup" className="ol-popup">
                            <a href="#" id="popup-closer" className="ol-popup-closer"></a>
                            <div id="popup-content"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
}