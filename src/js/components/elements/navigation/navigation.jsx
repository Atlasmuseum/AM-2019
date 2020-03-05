import React, { Component } from 'react'
import { withRouter } from "react-router"

import searchIcon from '../../../../assets/images/search.svg'
import editIcon from '../../../../assets/images/edit.svg'
import aroundIcon from '../../../../assets/images/around.svg'
import mapIcon from '../../../../assets/images/map.svg'
import helpIcon from '../../../../assets/images/help.svg'
import personIcon from '../../../../assets/images/person.svg'
import newsIcon from '../../../../assets/images/news.svg'
import aboutIcon from '../../../../assets/images/about.svg'

import NavigationItem from './navigationItem'

import './navigation.css'

/**
 * Navigation page d'accueil
 */
export class Navigation extends Component {
  navigation = [
    {
      icon: searchIcon,
      text: 'Explorer',
      name: 'search',
      backgroundColor: '#fff100',
      textColor: '#323232',
    },
    {
      icon: editIcon,
      text: 'Contribuer',
      name: 'edit',
      backgroundColor: '#ffeb00',
      textColor: '#323232',
    },
    {
      icon: aroundIcon,
      text: 'Autour de moi',
      name: 'around',
      backgroundColor: '#fee600',
      textColor: '#323232',
    },
    {
      icon: mapIcon,
      text: 'La carte',
      name: 'map',
      backgroundColor: '#ffe000',
      textColor: '#323232',
    },
    {
      icon: helpIcon,
      text: 'Aide',
      name: 'help',
      backgroundColor: '#4d4d4d',
      textColor: 'white',
    },
    {
      icon: personIcon,
      text: 'Déconnecter',
      name: 'person',
      backgroundColor: '#707070',
      textColor: 'white',
    },
    {
      icon: newsIcon,
      text: 'Actualités',
      name: 'news',
      backgroundColor: '#dcdcdc',
      textColor: '#323232',
    },
    {
      icon: aboutIcon,
      text: 'À propos',
      name: 'about',
      backgroundColor: '#eeeeee',
      textColor: '#323232',
      onClick: this.onClickAbout,
    },
  ]

  onClickItem = (name = null) => {
    switch (name) {
      case 'about':
        this.props.history.push('/about');
        break;

      case 'help':
        this.props.history.push('/help');
        break;

      case 'map':
        this.props.history.push('/map');
        break;

      case 'news':
        this.props.history.push('/news');
        break;
      default:
    }
  }

  render() {
    return (
      <nav className="appNavigation">
        <ul>
          {this.navigation.map((item) => (
            <NavigationItem
              key={item.text}
              text={item.text}
              name={item.name}
              icon={item.icon}
              backgroundColor={item.backgroundColor}
              hoverColor={item.hoverColor}
              textColor={item.textColor}
              onClick={this.onClickItem}
            />
          ))}
        </ul>
      </nav>
    )
  }
}

export default withRouter(Navigation)

