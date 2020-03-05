import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import L from 'leaflet'

import { getMap } from '../../../actions/index'
import DiscLoader from '../discLoader'

import './map.css'

const iconMarker = new L.Icon({
  iconUrl: require('../../../../assets/images/Picto-gris.png'),
  iconRetinaUrl: require('../../../../assets/images/Picto-gris.png'),
  iconSize: new L.Point(20, 31),
  iconAnchor: [10, 31],
  popupAnchor: [0, -25],
});

const createClusterCustomIcon = function (cluster) {
  const count = cluster.getChildCount()
  let className = 'map_cluster '
  let iconSize = 55
  if (count >= 20) { 
    className += 'map_cluster_xl'
    iconSize = 45
  }
  else if (count >= 10) {
    className += 'map_cluster_l'
    iconSize = 40
  }
  else if (count >= 5) {
    className += 'map_cluster_m'
    iconSize = 35
  }
  else {
    className += 'map_cluster_s'
    iconSize = 30
  }

  return L.divIcon({
    html: `<span>${count}</span>`,
    className,
    iconSize: L.point(iconSize, iconSize, true),
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
                      icon={iconMarker}
                    >
                      <Popup className="map_popup">
                        <span className="map_popup_title">{artwork.title}</span>
                        { artwork.artist
                          && (
                            <>
                              <hr className="map_popup_hr" />
                              <table className="map_popup_table">
                                <tbody>
                                  <tr>
                                    <th>Auteur :</th>
                                    <td>{artwork.artist}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </>
                          )
                        }
                      </Popup>
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
