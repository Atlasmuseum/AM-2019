import React, { Component } from 'react'

import colors from '../../../constants/colors';
import './colorsPicker.css'

/**
 * Loader
 */
export class ColorsPicker extends Component {
  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }
  escFunction = (event) => {
    if(event.keyCode === 27 && this.props.display) {
      this.props.onClose();
    }
  }

  render() {
    return (
      <div className={'colorsPicker' + (this.props.display ? ' colorsPickerDisplayed' : '')}>
        <h3>Couleurs</h3>
        <ul>
          {colors.map(color => (
            <li onClick={e => this.props.toggleColor(color)}>
              <input type="checkbox" checked={this.props.colors ? this.props.colors.map(item => item.value).includes(color.value) : false} />
              {color.label}
            </li>
          ))}
        </ul>
        <button onClick={this.props.onClose}>
          OK
        </button>
      </div>
    )
  }
}

export default ColorsPicker
