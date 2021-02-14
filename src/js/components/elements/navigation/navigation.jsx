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
  state = {
    navigation: [
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
        text: 'Se connecter',
        name: 'login',
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
    ],
    showPopup: false,
    logged: false,
  };

  componentDidMount = () => {
    /*
    const cookieValue = {
      'login': 'TestApp',
      'pass': 'TestAppLogin',
      'logged': true
    };
    this.createCookie('atlasmuseumapp', JSON.stringify(cookieValue));
    */
    try {
      //const cookie = this.getCookie('atlasmuseumapp');
      const cookieValue = JSON.parse(this.getCookie('atlasmuseumapp'));
      if (cookieValue.logged) {
        const navigation = [...this.state.navigation];
        navigation[5].text = 'Déconnecter';
        navigation[5].name = 'logout';
        this.setState({
          navigation,
          logged: true
        });
      }
    }
    catch (error) { }
  }

  getCookie = (cookieName) => {
    if (document.cookie.length > 0) {
      let c_start = document.cookie.indexOf(cookieName + '=');
      if (c_start !== -1) {
        c_start = c_start + cookieName.length + 1;
        let c_end = document.cookie.indexOf(';', c_start);
        if (c_end === -1) {
          c_end = document.cookie.length;
        }
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return '';
  }

  createCookie = (cookieName, cookieValue) => {
    var expires = '';
    document.cookie = cookieName + "=" + cookieValue + expires + "; path=/";
  }

  logout = () => {
    const cookieValue = {
      'login': '',
      'pass': '',
      'logged': false
    };
    this.createCookie('atlasmuseumapp', JSON.stringify(cookieValue));
    const navigation = [...this.state.navigation];
    navigation[5].text = 'Se connecter';
    navigation[5].name = 'login';
    this.setState({
      navigation,
      showPopup: false,
    });
  }

  onClickItem = (name = null) => {
    switch (name) {
      case 'about':
        this.props.history.push('/about');
        break;

      case 'around':
        this.props.history.push('/around');
        break;
      
      case 'edit':
        if (this.state.logged)
          this.props.history.push('/edit');
        else
          this.props.history.push('/login');
        break;

      case 'help':
        this.props.history.push('/help');
        break;
      
      case 'login':
        this.props.history.push('/login');
        break;
      
      case 'logout':
        this.setState({ showPopup: true });
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
    const {
      showPopup,
    } = this.state;

    return (
      <>
        <nav className="appNavigation">
          <ul>
            {this.state.navigation.map((item) => (
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
        { showPopup && (
          <div
            className="popupLogoutContainer"
            role="button"
            onClick={(e) => { this.setState({ showPopup: false })}}
          >
            <div
              className="popupLogoutContent"
              role="button"
              onClick={(e) => { e.stopPropagation(); }}
            >
              <p>Voulez-vous vraiment vous déconnecter ?</p>
              <p class="popupLogoutButtonsContainer">
                <button onClick={(e) => { this.setState({ showPopup: false })}}>Annuler</button>
                <button onClick={this.logout}>OK</button>
              </p>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Navigation)

