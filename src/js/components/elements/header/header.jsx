import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from "react-router"
import {
  Link,
} from "react-router-dom";

import backIcon from '../../../../assets/images/arrowLeft.png'
import headerIcon from '../../../../assets/images/headerIcon.png'
import editIcon from '../../../../assets/images/edit.svg'

import './header.css'

/**
 * En-tête
 */
export class Header extends Component {
  onClick = () => {
    const {
      history,
      link,
    } = this.props

    //history.push(link)
    window.history.back();
  }

  onClickEdit = () => {
    if (this.props.match && this.props.match.params && this.props.match.params.title) {
      this.props.history.push('/edit/' + this.props.match.params.title);
    }
  }

  render() {
    const {
      text,
      back,
      edit,
    } = this.props

    return (
      <header className="appHeader">
        <h1
          role="button"
          onClick={this.onClick}
        >
          {/*<Link to="/">*/}
            { back
            ? <img className="appHeaderBackIcon" src={backIcon} alt="back" />
            : <span className="appHeaderBackSpacer" />
            }
            <img className="appHeaderIcon" src={headerIcon} alt={text} />
            <span>{text}</span>
          {/*</Link>*/}
        </h1>
        { edit && (
          <button className="appHeaderEditButton" onClick={this.onClickEdit}>
            <img src={editIcon} alt="Editer cette notice" />
          </button>
        )}
      </header>
    )
  }
}

Header.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  text: PropTypes.string,
  back: PropTypes.bool,
  link: PropTypes.string,
  edit: PropTypes.bool,
}

Header.defaultProps = {
  text: 'atlasmuseum',
  back: false,
  link: '/',
  edit: false,
}

export default withRouter(Header)
