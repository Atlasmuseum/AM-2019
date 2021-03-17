import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";

import {
  getSearch,
} from '../../../actions/index';
import DiscLoader from '../discLoader';

import searchIcon from '../../../../assets/images/search.svg';

import './search.css'

export class SearchStandard extends Component {
  state = {
    searchReady: false,
    searchText: '',
  };

  componentDidMount() {
  }

  loadArtists = () => {
    const {
      getSearch,
    } = this.props;
    const {
      searchText
    } = this.state;

    getSearch({ search: searchText });
  }

  componentDidUpdate() {
    const {
      searchLoading,
      searchContent,
    } = this.props;

    const {
      searchReady,
    } = this.state;

    if (!searchLoading && !searchReady && searchContent) {
    }
  }

  onChangeSearch = (e) => {
    this.setState({ searchText: e.target.value });
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.doSearch();
    }
  }

  doSearch = () => {
    const {
      getSearch,
    } = this.props;
    const {
      searchText
    } = this.state;

    getSearch({ search: searchText });
  }

  render() {
    const {
      searchContent,
      searchLoading,
    } = this.props;
    const {
      searchText
    } = this.state;

    console.log(searchContent);

    return (
      <>
        <div className="searchInputContainer">
          <img src={searchIcon} alt="" role="button" onClick={this.doSearch} />
          <input
            type="text"
            value={searchText}
            className="searchInput"
            onChange={this.onChangeSearch}
            onKeyDown={this.handleKeyDown}
          />
        </div>
      <div className="nearbyArtworksContainer">
        { searchLoading || !searchContent/* || Object.prototype.toString.call(searchContent) !== '[object Array]'
          || (searchContent[0] && searchContent[0].article)*/
        ? (
            <DiscLoader />
          )
        : (
            <>
                {Object.prototype.toString.call(searchContent) === '[object Array]' && searchContent.map(artwork => (
                    <div
                        className="artworkLine"
                        //role="button"
                        //onClick={event => this.onClick(artist)}
                        key={artwork.fulltext}
                    >
                        <Link to={`/artwork/${artwork.fulltext}`}>{artwork.fulltext}</Link>
                    </div>
                ))}
            </>
          )
        }
      </div>
      </>
    );
  }
}

SearchStandard.propTypes = {
  searchLoading: PropTypes.bool.isRequired,
  searchContent: PropTypes.instanceOf(Array).isRequired,
}

SearchStandard.defaultProps = {
}

function mapStateToProps(state) {
  return {
    searchLoading: state.apiLoading,
    searchContent: state.apiResults,
  }
}

function mapDispatchToProps(dispatch, state) {
  return {
    getSearch: payload => dispatch(getSearch(payload)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchStandard));
