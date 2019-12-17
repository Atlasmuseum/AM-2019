import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getSearch } from '../../actions/index'
import searchIcon from '../../../assets/search.svg'

import './searchInput.css'

/**
 * Zone de recherche
 *
 * @param {func} getSearch - Fonction appelée à la validation de l'input ;
 *                           dans notre cas, appel de l'API TV Maze
 */
class SearchInput extends Component {
  state = {
    searchValue: ''
  }

  /**
   * Appelée lors d'un changement dans l'input
   *
   * @param {Object} event - Événement renvoyé par l'input
   */
  handleChange = (event) => {
    this.setState({ searchValue: event.target.value })
  }

  /**
   * Appelée lors de la validation de l'input
   *
   * @param {Object} event - Événement renvoyé par l'input
   */
  handleSubmit = (event) => {
    const {
      getSearch,
    } = this.props

    const {
      searchValue
    } = this.state

    event.preventDefault()
    getSearch({ searchValue })
    this.setState({ searchValue: '' })
  }

  render() {
    const {
      searchValue
    } = this.state

    return (
      <form className="searchInputContainer" onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={searchValue}
          onChange={this.handleChange}
          placeholder="Entrez un film, une série..."
        />
        <button type='submit'>
          <img src={searchIcon} alt="Rechercher" />
        </button>
      </form>
    )
  }
}

SearchInput.propTypes = {
  getSearch: PropTypes.func,
}

SearchInput.defaultProps = {
  getSearch: () => null,
}

function mapDispatchToProps(dispatch) {
  return {
    getSearch: searchValue => dispatch(getSearch(searchValue))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SearchInput)
