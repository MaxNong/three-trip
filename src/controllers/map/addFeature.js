import Vector from 'ol/layer/vector'
import SourceVector from 'ol/source/vector'
import Map from 'ol/map'
import Tile from 'ol/layer/tile'
import OSM from 'ol/source/osm'
import View from 'ol/view'
import Feature from 'ol/feature'
import Point from 'ol/geom/point'
import Polygon from 'ol/geom/Polygon'
import Style from 'ol/style/style'
import Icon from 'ol/style/icon'
import proj from 'ol/proj'
import LineString from 'ol/geom/linestring'
import ol from 'ol'
import OlOverlay from 'ol/Overlay'
import OlSourceTileJSON from 'ol/source/tilejson'
import olcoordinate from 'ol/coordinate'
import Select from 'ol/interaction/select'
import Circle from 'ol/style/circle'
import Fill from 'ol/style/fill'
import condition from 'ol/events/condition'
import GeoJSON from 'ol/format/geojson'
import conf from 'config'
// import router from '../../routers/router'

let svg = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve">' +
  '<path fill="#156BB1" d="M22.906,10.438c0,4.367-6.281,14.312-7.906,17.031c-1.719-2.75-7.906-12.665-7.906-17.031S10.634,2.531,15,2.531S22.906,6.071,22.906,10.438z"/>' +
  '<circle fill="#FFFFFF" cx="15" cy="10.677" r="3.291"/></svg>'

// LayerVector
class NewLayerVector {
  constructor () {
    this.instance = null
  }
}
NewLayerVector.getInstance = function () {
  if (!this.instance) {
    this.instance = new Vector({
      visible: false,
      source: NewSourceVector.getInstance()
    })
  }
  return this.instance
}

//SourceVector
class NewSourceVector {
  constructor () {
    this.instance = null
  }
}
NewSourceVector.getInstance = function () {
  if (!this.instance) {
    this.instance = new SourceVector()
  }
  return this.instance
}

//LayerTile
class NewLayerTile {
  constructor () {
    this.instance = null
  }
}
NewLayerTile.getInstance = function () {
  if (!this.instance) {
    this.instance = new Tile({
      visible: false,
      source: SourceOsm.getInstance()
    })
  }
  return this.instance
}

//SourceOsm
class SourceOsm {
  constructor () {
    this.instance = null
  }
}
SourceOsm.getInstance = function () {
  if (!this.instance) {
    this.instance = new OSM()
  }
  return this.instance
}

//SourceOsm
class Overlay {
  constructor () {
    this.target = null
    this.instance = null
  }
}
Overlay.getInstance = function (option, target) {
  if (!this.instance || this.target != target) {
    if (conf.olMap != '') conf.olMap.removeOverlay(this.instance)
    this.instance = new OlOverlay(option)
    this.target = target
  }
  return this.instance
}

let getFeatureConf = function (target) {
  let layer = NewLayerVector.getInstance()
  let layers = [NewLayerTile.getInstance(), layer]
  let overlay = Overlay.getInstance({
    element: document.getElementById('popup-' + target),
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    }
  }, target)
  let featureConf = {}
  featureConf.layers = layers
  featureConf.layer = layer
  featureConf.overlay = [overlay]
  return featureConf
}
let n = 0
let featureArr = []
class AddFeature {
  constructor (map, points) {
    console.log('newAddFeature')
  }
  addFeatures (layer, points, map) {
    featureArr = []
    points.forEach(v => {
      console.log(v.type)
      let opt = {}
      if (v.type === 'pos') {
        opt = {
          geometry: new Point([v.lon, v.lat]),
          name: v.name ? v.name : '',
          temperature: v.temperature,
          number: v.number
        }
      } else if (v.type === 'fire') {
        opt = {
          geometry: new Point([v.lon, v.lat]),
          temperature: v.temperature
        }
      }
      let feature = new Feature(opt)
      feature.setStyle(new Style({
        image: new Icon({
          src: v.type === 'pos' ? require('../../assets/images/men.png') : require('../../assets/images/fire.png')
        })
      }))
      featureArr.push(feature)
    })
    layer.getSource().clear() //清除feature
    featureArr.forEach(feature => {
      layer.getSource().addFeature(feature)
    })
    map.getView().setCenter([points[0].lon, points[0].lat])
    // setInterval(this.testFun, 1000)
  }
  testFun (e) {
    n = n + 0.01
    featureArr[0].setGeometry(new Point([104.2 - n, 30]))
  }
  addOverlays (map) {
    let content = document.getElementById('popup-content-' + map.values_.target)
    let select = new Select({
      condition: condition.pointerMove
    })
    let clickSelect = new Select()
    map.addInteraction(select)
    map.addInteraction(clickSelect)
    map.on('singleclick', function (mapEvent) {
      conf.point = mapEvent.coordinate
    })
    clickSelect.on('select', function () {
      window.app.$router.push({name: 'commandFourScreen'})
      document.getElementsByName('popup-detailMap')[0].classList.remove('map-tip-opacity')
    })
    select.on('select', function (e) {
      var pixel = map.getEventPixel(e.mapBrowserEvent.originalEvent)
      let coordinate = e.mapBrowserEvent.coordinate
      var feature = map.forEachFeatureAtPixel(pixel, function (feature) { return feature })
      if (feature) {
        let featureValues = feature.values_
        let html = ''
        Object.keys(featureValues).forEach(v => {
          if (v != 'geometry') {
            html = html + `<p>${v}：${featureValues[v]}</p>`
          }
        })
        content.innerHTML = html
        Overlay.getInstance({}, map.values_.target).setPosition(coordinate)
      } else {
        Overlay.getInstance({}, map.values_.target).setPosition(undefined)
      }
    })
  }
}

export {getFeatureConf, AddFeature}
