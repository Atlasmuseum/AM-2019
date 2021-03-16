import React, { Component } from 'react'

import materials from '../../../constants/materials';
import './materialsPicker.css'

/**
 * Loader
 */
export class MaterialsPicker extends Component {
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
      <div className={'materialsPicker' + (this.props.display ? ' materialsPickerDisplayed' : '')}>
        <h3>Couleurs</h3>
        <ul>
          {materials.map(material => (
            <li onClick={e => this.props.toggleMaterial(material)}>
              <input type="checkbox" checked={this.props.materials ? this.props.materials.map(item => item.value).includes(material.value) : false} />
              {material.label}
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

export default MaterialsPicker
