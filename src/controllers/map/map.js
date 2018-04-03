import Map from 'ol/map'
import Vector from 'ol/layer/vector'
import SourceVector from 'ol/source/vector'
import View from 'ol/view'
import TileLayer from 'ol/layer/tile'
import XYZ from 'ol/source/xyz'
import TileImage from 'ol/source/tileimage'
import TileGrid from 'ol/tilegrid/TileGrid'
import Group from 'ol/layer/Group'
import Tile from 'ol/layer/Tile'
import proj from 'ol/proj'
import control from 'ol/control'
import FullScreen from 'ol/control/fullscreen'
import OverviewMap from 'ol/control/overviewmap'
import interaction from 'ol/interaction'
import TileWMS from 'ol/source/tilewms'
import Api from 'src/services/api'
// import olJs from '../../lib/ol/ol.js'
// import olCss from '../../lib/ol/ol.css'
import olcoordinate from 'ol/coordinate'
import conf from 'config'
import {getFeatureConf, AddFeature} from 'addFeature' //添加特征锚点
import BingMaps from 'ol/source/bingmaps'

let paramData = {} //全部map创建选项
let config = {} //需要合并的其他map配置
let defaultOpt = {
  target: '',
  model: 'edit',
  minZoom: 3,
  maxZoom: 19,
  baseLayer: 'base',
  overlayLayer: ['road', 'water', 'build', 'fire-police'],
  editDataNo: '',
  editGraphs: []
}
class CreateMap {
  constructor (option) {
    paramData = Object.assign({}, defaultOpt, option)
    // if (paramData.points) config = getFeatureConf(paramData.target)
    this.addFeature = new AddFeature()
    let layers_styles = this.getLayers()
    this.styles = layers_styles.styles
    this.layers = layers_styles.layers
    this.map = new Map(this.getMapOption(paramData.target)) //创建地图
  }

  objBaseSatelliteLayerSource () {
    return new TileImage({
      projection: 'EPSG:3857',
      tileGrid: this.makeTileGrid(),
      tileUrlFunction: function (tileCoord, pixelRatio, proj) {
        let z = tileCoord[0]
        let x = tileCoord[1]
        let y = tileCoord[2]
        // 百度瓦片服务url将负数使用M前缀来标识
        if (x < 0) {
          x = 'M' + (-x)
        }
        if (y < 0) {
          y = 'M' + (-y)
        }
        return 'http://map.wensixian.com/api/map/index?t=b&x=' + x + '&y=' + y + '&z=' + z
      }
    })
  }

  makeTileGrid () {
    // 自定义分辨率和瓦片坐标系
    let resolutions = []
    // 计算使用的分辨率
    for (let i = 0; i <= 18; i++) {
      resolutions[i] = Math.pow(2, 18 - i)
    }
    return new TileGrid({
      origin: [0, 0], // 设置原点坐标
      resolutions: resolutions // 设置分辨率
    })
  }

  objBaseHybridLayerSource () {
    let _this = this
    return new TileImage({
      projection: 'EPSG:3857',
      tileGrid: _this.makeTileGrid(),
      tileUrlFunction: function (tileCoord, pixelRatio, proj) {
        let z = tileCoord[0]
        let x = tileCoord[1]
        let y = tileCoord[2]
        // 百度瓦片服务url将负数使用M前缀来标识
        if (x < 0) {
          x = 'M' + (-x)
        }
        if (y < 0) {
          y = 'M' + (-y)
        }
        return 'http://map.wensixian.com/api/map/index?t=h&x=' + x + '&y=' + y + '&z=' + z
      }
    })
  }

  objBaseNormalLayerSource () {
    let _this = this
    return new TileImage({
      projection: 'EPSG:3857',
      tileGrid: _this.makeTileGrid(),
      tileUrlFunction: function (tileCoord, pixelRatio, proj) {
        let z = tileCoord[0]
        let x = tileCoord[1]
        let y = tileCoord[2]
        // 百度瓦片服务url将负数使用M前缀来标识
        if (x < 0) {
          x = 'M' + (-x)
        }
        if (y < 0) {
          y = 'M' + (-y)
        }
        return 'http://map.wensixian.com/api/map/index?t=b&x=' + x + '&y=' + y + '&z=' + z
      }
    })
  }

  getMapOption (target) {
    let self = this
    return {
      interactions: interaction.defaults(),
      loadTilesWhileInteracting: true,
      layers: this.layers,
      view: new View({
        projection: 'EPSG:4326',
        center: [117.16, 32],
        zoom: 10
      }),
      // logo: {src: '/images/LOGO2.png', href: 'http://www.wensixian.com/'},
      // 在默认控件的基础上，再加上其他内置的控件
      controls: control.defaults().extend([
        new FullScreen(),
        new OverviewMap()
        // new olJs.LayerSwitcher()
      ]),
      target: target
    }
  }
  getLayers () {
    let styles = [
      'plane', //平面图
      'blank',
      'road', //路面图
      'aerial' //卫星图
    ]
    let layers = []
    //平面图
    layers.push(new Tile({
      visible: true,
      preload: Infinity,
      source: this.objBaseSatelliteLayerSource()
    }), new Vector({ //用于存放features
      visible: true,
      source: new SourceVector()
    }))
    //路面图
    layers.push(new Tile({
      visible: false,
      preload: Infinity,
      source: this.objBaseHybridLayerSource()
    }))
    //卫星图
    // layers.push(new Group({
    //   title: '地图',
    //   layers: [
    //     new Group({
    //       title: '卫星图',
    //       type: 'base',
    //       combine: true,
    //       visible: true,
    //       layers: [
    //         new Tile({
    //           source: this.objBaseSatelliteLayerSource()
    //         }),
    //         new Tile({
    //           source: this.objBaseHybridLayerSource()
    //         })
    //       ]
    //     }),
    //     new Tile({
    //       title: '平面图',
    //       type: 'base',
    //       visible: true,
    //       source: this.objBaseHybridLayerSource()
    //     })
    //   ]
    // }))
    // 需要添加feature icon
    layers.push(new Tile({
      visible: false,
      source: new TileWMS({
        // tileLoadFunction: function (tileCoord, pixelRatio, proj) {
        //   let z = tileCoord[0]
        //   let x = tileCoord[1]
        //   let y = tileCoord[2]
        //   // 百度瓦片服务url将负数使用M前缀来标识
        //   if (x < 0) {
        //     x = 'M' + (-x)
        //   }
        //   if (y < 0) {
        //     y = 'M' + (-y)
        //   }
        //   return 'http://map.wensixian.com/api/map/index?t=b&x=' + x + '&y=' + y + '&z=' + z
        // },
        // url: 'http://map.wensixian.com/api/map/index',
        params: {
          'FORMAT': 'image/png',
          'VERSION': '1.1.1',
          'SRS': 'EPSG:3857',
          'tiled': true,
          'LAYERS': 'gmws:sichuan_province'
        },
        tileGrid: this.makeTileGrid(),
        serverType: 'geoserver'
      })
    }))
    // if (paramData.points) {
    //   this.addFeature.addFeatures(layers[1], paramData.points)
    // }
    return {styles: styles, layers: layers}
  }
  updateFeatureOverlays (map, points) {
    this.addFeature.addFeatures(this.layers[1], points, map)
    this.addFeature.addOverlays(map) //添加overLayers
  }
  //切换地图类型
  changeMapType (type) {
    for (let i = 0, ii = this.layers.length; i < ii; ++i) {
      this.layers[1].setVisible(true) //feature一直是可见的
      this.layers[i].setVisible(this.styles[i] === type)
    }
  }
}

export default CreateMap
