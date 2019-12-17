import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './resultCard.css'

/**
 * Carte affichant un unique résultat de recherche
 *
 * @param {string} [title=null] - Titre du résultat
 * @param {string} [image=null] - Image à afficher ; si aucune image n'est fournie, une image par défaut est affichée
 * @param {string} [network=null] - Nom du réseau
 * @param {string} [summary=null] - Résumé du résultat ; peut être du HTML
 */
export class ResultCard extends Component {
  render() {
    const {
      title,
      image,
      network,
      summary,
    } = this.props

    return (
      <div className="resultCard">
        <div className="resultCardImage">
          <img src={image ? image: 'http://static.tvmaze.com/images/no-img/no-img-portrait-text.png'} alt="" />
        </div>
        <div className="resultCardContent">
          <h2>{title}</h2>
          { network
            && (
              <div className="resultCardNetwork">({network})</div>
            )
          }
          { summary
            && (
              <div className="resultCardSummary" dangerouslySetInnerHTML={{__html: summary}} />
            )
          }
        </div>
      </div>
    )
  }
}

ResultCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  network: PropTypes.string,
  summary: PropTypes.string,
}

ResultCard.defaultProps = {
  title: null,
  image: null,
  network: null,
  summary: null,
}

export default ResultCard
