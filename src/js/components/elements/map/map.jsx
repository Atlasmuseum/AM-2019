import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import L from 'leaflet'

import { getMap } from '../../../actions/index'
import DiscLoader from '../discLoader'

import './map.css'

const createClusterCustomIcon = function (cluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'marker-cluster-custom',
    iconSize: L.point(40, 40, true),
  });
};

/**
 * Chargement d'une page sur atlasmuseum
 */
export class ArtworkMap extends Component {
  state = {
    mapReady: false,
  }

  componentDidMount() {
    const {
      getMap,
    } = this.props

    getMap()
  }

  componentDidUpdate() {
    const {
      mapLoading,
    } = this.props

    const {
      mapReady,
    } = this.state

    if (!mapLoading && !mapReady) {
      // this.createMap()
      this.setState({ mapReady: true })
    }
  }

  render() {
    const {
      mapLoading,
      mapContent,
    } = this.props
console.log(mapContent)
    return (
      <div className="mapContainer">
        { mapLoading
        ? (
            <DiscLoader />
          )
        : (
          <Map center={[48, 0]} zoom={4} style={{width: '100%', height: '100%'}} maxZoom={18}
            preferCanvas={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            { mapContent.length > 0
              && (
                <MarkerClusterGroup
                showCoverageOnHover={false}
    spiderfyDistanceMultiplier={2}
    iconCreateFunction={createClusterCustomIcon}
                >
                { mapContent.map(artwork => (
                  <Marker
                    key={artwork.article}
                    position={[artwork.lat, artwork.lon]}
                  >
                    <Popup>{artwork.title}</Popup>
                  </Marker>
                ))}
                </MarkerClusterGroup>
              )
            }
          </Map>
          )
        }
      </div>
    )
  }
}

ArtworkMap.propTypes = {
  mapLoading: PropTypes.bool.isRequired,
  mapContent: PropTypes.instanceOf(Array).isRequired,
}

ArtworkMap.defaultProps = {
}

function mapStateToProps(state) {
  return {
    mapLoading: state.apiLoading,
    mapContent: state.apiResults,
  }
}

function mapDispatchToProps(dispatch, state) {
  return {
    getMap: page => dispatch(getMap()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtworkMap)
