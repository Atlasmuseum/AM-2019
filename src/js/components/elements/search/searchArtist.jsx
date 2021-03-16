import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";

import {
  getArtworksByArtist,
} from '../../../actions/index';
import DiscLoader from '../discLoader';

export class SearchArtist extends Component {
  state = {
    artistsReady: false,
  };

  componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.title) {
      this.loadArtist(this.props.match.params.title);
    }
  }

  loadArtist = (artistName) => {
    const {
      getArtworksByArtist,
    } = this.props;

    getArtworksByArtist({ artistName });
  }

  componentDidUpdate() {
    const {
      artworksLoading,
      artworksContent,
    } = this.props;

    const {
      artistsReady,
    } = this.state;

    if (!artworksLoading && !artistsReady && artworksContent) {
    }
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
                        //role="button"
                        //onClick={event => this.onClick(artist)}
                        key={artwork.nature === 'wikidata' ? artwork.wikidata : artwork.article}
                    >
                      <Link to={`/artwork/${artwork.nature === 'wikidata' ? artwork.wikidata : artwork.article}`}>
                        <h2>{artwork.titre}</h2>
                      </Link>
                    </div>
                ))}
            </>
          )
        }
      </div>
    );
  }
}

SearchArtist.propTypes = {
  artworksLoading: PropTypes.bool.isRequired,
  artworksContent: PropTypes.instanceOf(Array).isRequired,
}

SearchArtist.defaultProps = {
}

function mapStateToProps(state) {
  return {
    artworksLoading: state.apiLoading,
    artworksContent: state.apiResults,
  }
}

function mapDispatchToProps(dispatch, state) {
  return {
    getArtworksByArtist: payload => dispatch(getArtworksByArtist(payload)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchArtist));
