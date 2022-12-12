// Import stylesheets
import './style.css';
import {
  Map,
  TileLayer,
  LayerGroup,
  Control,
  Marker,
  Icon,
  GeoJSON,
} from 'leaflet';

// Write Javascript code!
const map = new Map('map');

// 高德切片地址
const amapLayer = new TileLayer(
  'http://wprd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7',
  {
    subdomains: '1234',
  }
);

const tdtVectorLayer = new TileLayer(
  'http://t0.tianditu.gov.cn/vec_w/wmts?layer=vec&style=default&tilematrixset=w&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=e9b1e38796d3192a17dcccaffd6bd95d',
  {}
);

// e9b1e38796d3192a17dcccaffd6bd95d

const tdtLabelLayer = new TileLayer(
  'http://t0.tianditu.gov.cn/cva_w/wmts?layer=cva&style=default&tilematrixset=w&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=e9b1e38796d3192a17dcccaffd6bd95d',
  {}
);

const tdtLayer = new LayerGroup([tdtVectorLayer, tdtLabelLayer]);

amapLayer.addTo(map);

map.setView([39.9, 116.38], 10);

const layerControl = new Control.Layers({
  高德: amapLayer,
  天地图: tdtLayer,
});
layerControl.addTo(map);

const svg =
  '<svg t="1670850288712" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4603" width="200" height="200"><path d="M971.2 245.44a263.68 263.68 0 0 0-192-192 1717.12 1717.12 0 0 0-533.44 0 263.68 263.68 0 0 0-192 192 1717.12 1717.12 0 0 0 0 533.44 263.68 263.68 0 0 0 192 192 1717.12 1717.12 0 0 0 533.44 0 263.68 263.68 0 0 0 192-192 1719.04 1719.04 0 0 0 0-533.44zM800 544a64 64 0 0 1-64 64h-128v128a64 64 0 0 1-64 64h-64a64 64 0 0 1-64-64v-128H288a64 64 0 0 1-64-64v-64a64 64 0 0 1 64-64h128V288a64 64 0 0 1 64-64h64a64 64 0 0 1 64 64v128h128a64 64 0 0 1 64 64z" fill="#FF0000" p-id="4604"></path></svg>';

const svg2 =
  '<svg t="1670850418244" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5683" width="200" height="200"><path d="M213.333333 562.346667v170.666666L512 896l298.666667-162.986667v-170.666666L512 725.333333l-298.666667-162.986666zM512 128L42.666667 384l469.333333 256 384-209.493333V725.333333h85.333333V384L512 128z" fill="#0000FF" p-id="5684"></path></svg>';

const data = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        NANE: 'A医院',
        TYPE: '医院',
      },
      geometry: {
        type: 'Point',
        coordinates: [116.5381038277826, 39.914929856883646],
      },
    },
    {
      type: 'Feature',
      properties: {
        NANE: 'B医院',
        TYPE: '医院',
      },
      geometry: {
        type: 'Point',
        coordinates: [116.37056667665269, 40.021623653066115],
      },
    },
    {
      type: 'Feature',
      properties: {
        NANE: 'C学校',
        TYPE: '学校',
      },
      geometry: {
        type: 'Point',
        coordinates: [116.20590982038584, 39.9167708157581],
      },
    },
    {
      type: 'Feature',
      properties: {
        TYPE: '医院',
        NANE: 'D医院',
      },
      geometry: {
        type: 'Point',
        coordinates: [116.4475208579521, 39.92448839696311],
      },
    },
    {
      type: 'Feature',
      properties: {
        TYPE: '学校',
        NANE: 'E学校',
      },
      geometry: {
        type: 'Point',
        coordinates: [116.47213017147038, 39.98307020184643],
      },
    },
  ],
};

const glayer = new GeoJSON(data, {
  pointToLayer: (geoJsonPoint, latlng) => {
    switch (geoJsonPoint.properties['TYPE']) {
      case '医院':
        return new Marker(latlng, {
          icon: new Icon({
            iconUrl: 'data:image/svg+xml,' + encodeURIComponent(svg),
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          })
        }).bindTooltip(geoJsonPoint.properties['NAME'],  { permanent: true });
      case '学校':
        return new Marker(latlng, {
          icon: new Icon({
            iconUrl: 'data:image/svg+xml,' + encodeURIComponent(svg2),
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          })
        }).bindTooltip(geoJsonPoint.properties['NAME'],  { permanent: true });
    }
  } // Popup
});

glayer.addTo(map);
