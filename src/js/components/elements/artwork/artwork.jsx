import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from "react-router"

import {
  getArtwork,
  getImage,
} from '../../../actions/index'
import DiscLoader from '../discLoader'
import reloadIcon from '../../../../assets/images/reloadIcon.svg'
import missingImage from '../../../../assets/images/Image-manquante.jpg'

import './artwork.css'

/**
 * Chargement d'une œuvre
 */
export class Artwork extends Component {
  state = {
    artworkReady: false,
    imageReady: false,
    article: null,
    origin: null,
    title: null,
    image: null,
    imageData: null,
    artist: null,
    date: null,
    place: null,
    lat: null,
    lon: null,
    nature: null,
    colors: null,
    materials: null,
    keywords: null,
    context: null,
    site: null,
    city: null,
    region: null,
    country: null,
    siteDetails: null,
  }

  componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.title) {
      this.loadArtwork(this.props.match.params.title)
    }
  }

  loadArtwork = (article) => {
    const {
      getArtwork,
    } = this.props

    this.setState({ article })
    getArtwork(article)
  }

  componentDidUpdate() {
    const {
      artworkLoading,
      artworkContent,
      imageLoading,
      imageContent,
    } = this.props

    const {
      artworkReady,
      imageReady,
    } = this.state

    if (!imageLoading && !imageReady && imageContent && imageContent.thumbnail) {
      this.setState({
        imageReady: true,
        image: imageContent.thumbnail,
      })
    }

    if (!artworkLoading && !artworkReady) {
      let origin = null
      let title = null
      let artist = null
      let nature = null
      let colors = null
      let materials = null
      let site = null
      let city = null
      let region = null
      let country = null
      let siteDetails = null
      let place = null
      let date = null
      let image = null
      let imageData = null

      if (artworkContent && artworkContent.data) {
        console.log(artworkContent.data)
        origin = artworkContent.origin
        if (artworkContent.data.titre.value.length > 0) {
          title = artworkContent.data.titre.value[0]
          artist = this.getLabels(artworkContent.data.artiste)
          nature = this.getValues(artworkContent.data.nature)
          colors = this.getLabels(artworkContent.data.couleur)
          materials = this.getLabels(artworkContent.data.materiaux)
          site = this.getLabels(artworkContent.data.site_nom)
          city = this.getLabels(artworkContent.data.site_ville)
          region = this.getValues(artworkContent.data.site_region)
          country = this.getLabels(artworkContent.data.site_pays)
          siteDetails = this.getValues(artworkContent.data.site_details)
          date = this.getValues(artworkContent.data.inauguration)
          imageData = artworkContent.data.image_principale && artworkContent.data.image_principale.value.length > 0
            ? artworkContent.data.image_principale.value[0]
            : null
          const placeData = []
          if (city)
            placeData.push(city)
          if (city)
            placeData.push(country)
          if (placeData.length > 0)
            place = placeData.join(', ')

          if (imageData === null) {
            image = missingImage;
          }
        }
      }

      this.setState({
        artworkReady: true,
        origin,
        title,
        artist,
        nature,
        colors,
        materials,
        site,
        city,
        region,
        country,
        siteDetails,
        place,
        date,
        image,
        imageData,
      })
    }
  }

  getLabels = (data) => {
    let labels = []
    if (data && data.value) {
      for (let i = 0; i < data.value.length; i++) {
        labels.push(data.value[i].label)
      }
    }

    return labels.join(', ')
  }

  getValues = (data) => {
    if (data && data.value) {
      return data.value.join(', ')
    }
    else {
      return ''
    }
  }

  loadImage = () => {
    const {
      getImage,
    } = this.props

    const {
      imageData
    } = this.state

    getImage({
      image: imageData.value,
      origin: imageData.origin,
      width: 420
    })
  }

  render() {
    const {
      artworkLoading,
      imageLoading,
    } = this.props

    const {
      origin,
      article,
      image,
      title,
      artist,
      date,
      place,
      nature,
      colors,
      materials,
      site,
      city,
      region,
      country,
      siteDetails,
    } = this.state

    return (
      <div className="artworkContainer">
        { artworkLoading
        ? (
            <DiscLoader />
          )
        : (
            <>
              { image
              ? <div className="artworkImageContainer">
                  <img src={image} alt ="" />
                </div>
              : <div className="artworkImagePlaceholder">
                  <div
                    className="artworkImagePlaceholderInner"
                    onClick={this.loadImage}
                    role="button"
                  >
                    <img className={imageLoading ? 'loaderRotate' : ''} src={reloadIcon} alt="" />
                    <span>Téléchargez la photo</span>
                  </div>
                </div>
              }
              <div className="artworkInfosContainer">
                <h2>{title}</h2>
                <ul>
                  { artist && ( <li>{artist}</li>) }
                  { date && ( <li>{date}</li> ) }
                  { place && ( <li>{place}</li> ) }
                </ul>
                <section>
                  <h3>Œuvre</h3>
                  <table>
                    <tbody>
                      <tr><th>Nature</th><td>{nature}</td></tr>
                      {colors && (
                        <tr><th>Couleurs</th><td>{colors}</td></tr>
                      )}
                      {materials && (
                        <tr><th>Matériaux</th><td>{materials}</td></tr>
                      )}
                    </tbody>
                  </table>
                </section>
                <section>
                  <h3>Site</h3>
                  <table>
                    <tbody>
                      { site && (
                        <tr><th>Nom du site</th><td>{site}</td></tr>
                      )}
                      { city && (
                        <tr><th>Ville</th><td>{city}</td></tr>
                      )}
                      { region && (
                        <tr><th>Région</th><td>{region}</td></tr>
                      )}
                      { country && (
                        <tr><th>Pays</th><td>{country}</td></tr>
                      )}
                      { siteDetails && (
                        <tr><th>Détail sur le site</th><td>{siteDetails}</td></tr>
                      )}
                    </tbody>
                  </table>
                </section>
                <a className="amLink" href={'http://atlasmuseum.net/wiki/' + (origin === 'wikidata' ? 'Spécial:Wikidata/' : '') + article} target="_blank" rel="noopener noreferrer">
                  Voir la notice complète sur atlasmuseum.net
                </a>
              </div>
            </>
          )
        }
      </div>
    )
  }
}

Artwork.propTypes = {
  artworkLoading: PropTypes.bool.isRequired,
  artworkContent: PropTypes.instanceOf(Array).isRequired,
}

Artwork.defaultProps = {
}

function mapStateToProps(state) {
  return {
    artworkLoading: state.apiLoading,
    artworkContent: state.apiResults,
    imageLoading: state.imageLoading,
    imageContent: state.apiImageResults,
  }
}

function mapDispatchToProps(dispatch, state) {
  return {
    getArtwork: title => dispatch(getArtwork(title)),
    getImage: payload => dispatch(getImage(payload)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Artwork))
