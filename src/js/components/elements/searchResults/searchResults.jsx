import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ResultCard from '../resultCard'

import './searchResults.css'

/**
 * Affiche les résultats d'une recherche
 *
 * @param {Array} results - Résultats de recherche
 * @param {bool} activated - true si une recherche a été faite, false sinon ;
 *                           permet de ne pas afficher "aucun résultat" si l'utilisateur
 *                           n'a pas encore commencé à chercher quelque chose
 */
export class SearchResults extends Component {
  render() {
    const {
      results,
      activated,
    } = this.props

    return (
      <div className="searchResultContainer">
        { results && results.length > 0
          && (
            <>
              <h1 className="searchResultHeader">Résultats</h1>
              <ul>
                {results.map(item => (
                  <li key={item.show.id}>
                    <ResultCard
                      title={item.show.name}
                      image={item.show.image ? item.show.image.medium : null}
                      network={item.show.network ? item.show.network.name : null}
                      summary={item.show.summary}
                    />
                  </li>
                ))}
              </ul>
            </>
          )
        }
        { results && results.length === 0 && activated
          && (
            <p>Aucun résultat</p>
          )
        }
      </div>
    )
  }
}

SearchResults.propTypes = {
  results: PropTypes.instanceOf(Array),
}

SearchResults.defaultProps = {
  results: [],
}

function mapStateToProps(state) {
  return {
    results: state.searchResults,
    activated: state.searchActivated,
  }
}

export default connect(
  mapStateToProps,
  {}
)(SearchResults)
