import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Élément de navigation de la page d'accueil
 *
 * @param {string} text - Texte à afficher
 * @param {string} name - Nom de la classe
 * @param {string} icon - Icone à afficher
 * @param {func} onClick - Fonction si clic
 * @param {string} backgroundColor - Couleur de fond
 * @param {string} textColor - Couleur de texte
 */
export class NavigationItem extends Component {
  render() {
    const {
      text,
      name,
      icon,
      onClick,
      backgroundColor,
      textColor,
    } = this.props

    return (
      <li
        key={name}
        role="button"
        onClick={(e) => onClick(name)}
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
        }}
      >
        <img name="navIcon" src={icon} alt={text} />
        <span>{text}</span>
      </li>
    )
  }
}

NavigationItem.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
}

NavigationItem.defaultProps = {
  text: null,
  name: null,
  icon: null,
  onClick: () => null,
  backgroundColor: 'white',
  textColor: 'black',
}

export default NavigationItem
