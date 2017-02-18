import React, { PropTypes, Component } from 'react';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import classNames from 'classnames/bind';
import styles from './LeafletMap.styles.css';
import neighborhoodregionsJSON from './Neighborhoods_regions.json';

const cx = classNames.bind(styles);
const className = cx({ base: true });

function addGeoData(data, component) {
  return class BoundGeoData extends Component {
    constructor() {
      super();
      this.state = {
        geoData: gd,
        center: options.position,
        zoom: props.zoom || options.zoom,
        attribute: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      };
    }
    handleHover = (feature, layer) => {
      if (feature.properties && feature.properties.NAME) {
        layer.bindPopup(feature.properties.NAME);
        layer.on('mouseover', (e) => {
          e.target.openPopup();
        });
      }
    }
    render() {
      return (
        <WrappedComponent
          attribution={this.state.attribution}
          url={this.state.url}
          data={this.state.geoData}
          center={this.state.center}
          zoom={this.state.zoom}
          handleHover={this.handleHover}
        />
      );
    }
  };
}

const BareLeafletMap = (props) => {
  require('../../assets/leaflet.css');
  return (
    <div className={'map'}>
      <Map
        className={className}
        zoom={props.zoom}
        center={props.center}
        zoomControl
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        >
        <TileLayer url={props.url} attribution={props.attribution} />
        <GeoJSON data={props.data} onEachFeature={props.handleHover} />
      </Map>
    </div>
  );
};

const PDXLeafletMap = addGeoData(
  BareLeafletMap,
  neighborhoodregionsJSON,
  { center: [45.51, -122.68], zoom: 13 },
);

// const LeafletMap = (props) => {
//   require('../../assets/leaflet.css');
//   return (
//     <Map id="map" center={props.center} zoom={props.zoom}>
//       <TileLayer
//         url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <GeoJSON data={neighborhoodregionsJSON} />
//       <Marker position={props.center} >
//         <Popup>
//           <span>A pretty CSS3 popup. <br />Currently set to the center coordinates.</span>
//         </Popup>
//       </Marker>
//     </Map>
//   );
// };

LeafletMap.displayName = 'LeafletMap';

LeafletMap.propTypes = {
  center: React.PropTypes.array,
  zoom: React.PropTypes.number,
  // url: React.PropTypes.string,
  // attribution: React.PropTypes.string,
};

export default LeafletMap;