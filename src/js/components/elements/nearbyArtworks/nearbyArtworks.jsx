import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import {
  getNearbyArtworks,
} from '../../../actions/index';
import DiscLoader from '../discLoader';

import './nearbyArtworks.css';

/**
 * Chargement des oeuvres proches
 */
export class NearbyArtworks extends Component {
  state = {
    artworksReady: false,
  };

  componentDidMount() {
    this.loadArtworks();
  }

  loadArtworks = () => {
    const {
      getNearbyArtworks,
    } = this.props;

    navigator.geolocation.getCurrentPosition(function(position) {
        getNearbyArtworks({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            distance: 2,
        });
    });
  }

  componentDidUpdate() {
    const {
      artworksLoading,
      artworksContent,
    } = this.props;

    const {
      artworksReady,
    } = this.state;

    if (!artworksLoading && !artworksReady && artworksContent) {
    }
  }

  formatDistance = (distance) => {
        return distance.toFixed(2).replace('.', ',');
  }

  onClick = (artwork) => {
      this.props.history.push('artwork/' + (artwork.nature === 'wikidata' ? artwork.wikidata : artwork.article));
  }

  render() {
    const {
        artworksContent,
        artworksLoading,
    } = this.props;

    return (
      <div className="nearbyArtworksContainer">
        { artworksLoading || !artworksContent || Object.prototype.toString.call(artworksContent) !== '[object Array]'
        ? (
            <DiscLoader />
          )
        : (
            <>
                {artworksContent.map(artwork => (
                    <div
                        className="artworkLine"
                        role="button"
                        onClick={event => this.onClick(artwork)}
                    >
                        <h2>{artwork.titre}</h2>
                        <p>{this.formatDistance(artwork.distance)} km</p>
                    </div>
                ))}
            </>
          )
        }
      </div>
    );
  }
}

NearbyArtworks.propTypes = {
  artworksLoading: PropTypes.bool.isRequired,
  artworksContent: PropTypes.instanceOf(Array).isRequired,
}

NearbyArtworks.defaultProps = {
}

function mapStateToProps(state) {
  return {
    artworksLoading: state.apiLoading,
    artworksContent: state.apiResults,
  }
}

function mapDispatchToProps(dispatch, state) {
  return {
    getNearbyArtworks: payload => dispatch(getNearbyArtworks(payload)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NearbyArtworks));
