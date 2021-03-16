import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";

import {
  getArtists,
} from '../../../actions/index';
import DiscLoader from '../discLoader';

export class SearchArtists extends Component {
  state = {
    artistsReady: false,
  };

  componentDidMount() {
    this.loadArtists();
  }

  loadArtists = () => {
    const {
      getArtists,
    } = this.props;

    getArtists();
  }

  componentDidUpdate() {
    const {
      artistsLoading,
      artistsContent,
    } = this.props;

    const {
      artistsReady,
    } = this.state;

    if (!artistsLoading && !artistsReady && artistsContent) {
    }
  }

  render() {
    const {
        artistsContent,
        artistsLoading,
    } = this.props;

    return (
      <div className="nearbyArtworksContainer">
        { artistsLoading || !artistsContent || Object.prototype.toString.call(artistsContent) !== '[object Array]'
          || (artistsContent[0] && artistsContent[0].article)
        ? (
            <DiscLoader />
          )
        : (
            <>
                {artistsContent.map(artist => (
                    <div
                        className="artworkLine"
                        //role="button"
                        //onClick={event => this.onClick(artist)}
                        key={artist}
                    >
                        <Link to={`artist/${artist}`}>{artist}</Link>
                    </div>
                ))}
            </>
          )
        }
      </div>
    );
  }
}

SearchArtists.propTypes = {
  artistsLoading: PropTypes.bool.isRequired,
  artistsContent: PropTypes.instanceOf(Array).isRequired,
}

SearchArtists.defaultProps = {
}

function mapStateToProps(state) {
  return {
    artistsLoading: state.apiLoading,
    artistsContent: state.apiResults,
  }
}

function mapDispatchToProps(dispatch, state) {
  return {
    getArtists: () => dispatch(getArtists()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchArtists));
