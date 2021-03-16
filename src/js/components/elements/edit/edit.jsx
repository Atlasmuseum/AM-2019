import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from "react-router"

import {
  getArtwork,
  getImage,
} from '../../../actions/index'
import DiscLoader from '../discLoader'
import ColorsPicker from '../colorsPicker'
import MaterialsPicker from '../materialsPicker'
import cameraIcon from '../../../../assets/images/cameraIcon.svg'

import './edit.css'

/**
 * Edition d'une œuvre
 */
export class Edit extends Component {
  state = {
    artworkReady: false,
    imageReady: false,
    article: null,
    origin: null,
    title: '',
    image: null,
    imageData: null,
    artist: '',
    date: '',
    place: null,
    lat: null,
    lon: null,
    nature: null,
    colors: [],
    materials: [],
    keywords: null,
    context: null,
    site: '',
    city: '',
    department: null,
    region: null,
    country: null,
    siteDetails: null,
    description: '',
    openVideo: false,
    login: null,
    pass: null,
    uploadingImage: false,
    uploadingText: false,
    showPopup: false,
    showColors: false,
    showMaterials: false,
  }

  componentDidMount() {
    const cookieValue = JSON.parse(this.getCookie('atlasmuseumapp'));
    if (!cookieValue.logged || !cookieValue.login || !cookieValue.pass) {
      this.props.history.push('/login');
    }
    this.setState({
      login: cookieValue.login,
      pass: cookieValue.pass,
    });

    if (this.props.match && this.props.match.params && this.props.match.params.title) {
      this.loadArtwork(this.props.match.params.title)
    } else {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        this.reverseGeocoding(position.coords.latitude, position.coords.longitude);
      });
    }
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

  reverseGeocoding = async (lat, lon) => {
    this.setState({artworkLoading: true});

    const urlBase = 'https://atlasmuseum.net/w/amapi/gmaps.php';
    const params = {
      latitude: lat,
      longitude: lon,
      username: 'atlasmuseum',
    };
    const url = urlBase + '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&');

    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    });
    const data = await response.json();

    const city = data && data.locality ? data.locality : null
    const department = data && data.administrative_area_level_2 ? data.administrative_area_level_2 : null
    const country = data && data.country ? data.country : null
    const region = data && data.administrative_area_level_1 ? data.administrative_area_level_1 : null

    this.setState({
      artworkLoading: false,
      city,
      department,
      region,
      country,
    });
  }

  handleVideo = (stream) => {
    var main = document.getElementById('appContent');
    main.classList.add('main-overflow-hidden');

    var video = document.getElementById('video');
    video.srcObject = stream;
    video.play();
  }

  videoError = () => {
  }

  closeVideo = () => {
    var main = document.getElementById('appContent');
    main.classList.remove('main-overflow-hidden');

    var video = document.getElementById('video');

    var canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    var dataURI = canvas.toDataURL('image/jpeg');

    this.setState({
      openVideo: false,
      image: dataURI,
    })
  }

  takePicture = () => {
    this.setState({ openVideo: true })
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        {
          video: {
            facingMode: { ideal: 'environment' }
          }
        },
        this.handleVideo,
        this.videoError
      );
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
      let description = null
      let colors = null
      let materials = null
      let site = null
      let city = null
      let department = null
      let region = null
      let country = null
      let siteDetails = null
      let place = null
      let date = null
      let image = null
      let imageData = null
      let lat = null
      let lon = null

      if (artworkContent && artworkContent.data) {
        // console.log(artworkContent.data)
        origin = artworkContent.origin
        if (artworkContent.data.titre.value.length > 0) {
          title = artworkContent.data.titre.value[0]
          artist = this.getLabels(artworkContent.data.artiste)
          nature = this.getValues(artworkContent.data.nature)
          description = this.getValues(artworkContent.data.description)
          colors = this.getLabelsAndValues(artworkContent.data.couleur)
          materials = this.getLabelsAndValues(artworkContent.data.materiaux)
          site = this.getLabels(artworkContent.data.site_nom)
          city = this.getLabels(artworkContent.data.site_ville)
          department = this.getValues(artworkContent.data.site_departement)
          region = this.getValues(artworkContent.data.site_region)
          country = this.getLabels(artworkContent.data.site_pays)
          siteDetails = this.getValues(artworkContent.data.site_details)
          date = this.getValues(artworkContent.data.inauguration)
          imageData = artworkContent.data.image_principale && artworkContent.data.image_principale.value.length > 0
            ? artworkContent.data.image_principale.value[0]
            : null
          if (artworkContent.data.site_coordonnees) {
            lat = artworkContent.data.site_coordonnees.value[0].lat
            lon = artworkContent.data.site_coordonnees.value[0].lon
          }
          const placeData = []
          if (city)
            placeData.push(city)
          if (city)
            placeData.push(country)
          if (placeData.length > 0)
            place = placeData.join(', ')
        }
      }

      this.setState({
        artworkReady: true,
        origin,
        title,
        artist,
        nature,
        description,
        colors,
        materials,
        site,
        city,
        department,
        region,
        country,
        siteDetails,
        place,
        date,
        image,
        imageData,
        lat,
        lon,
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

  getLabelsAndValues = (data) => {
    const result = [];

    if (data && data.value) {
      for (let i = 0; i < data.value.length; i++) {
        result.push({
          label: data.value[i].label,
          value: data.value[i].article,
        });
      }
    }

    return result;
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

  updateText = (variable, value) => {
    if (value !== null)
      this.setState({[variable]: value});
  }

  createTimeStamp = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const hh = String(today.getHours()).padStart(2, '0');
    const min = String(today.getMinutes()).padStart(2, '0');
    const ss = String(today.getSeconds()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}_${hh}-${min}-${ss}`;
  }

  createFileName = () => {
    return `App-${this.createTimeStamp()}.jpg`;
  }

  uploadImage = async (blob, fileName) => {
    const file = new File([blob], fileName, {type: 'image/jpg'});

    const url = 'https://atlasmuseum.net/w/app/upload.php';
    const data = {
        file: file,
        name: fileName,
        user: this.state.login,
        password: this.state.pass,
    };

    const formData  = new FormData();

    for(const name in data) {
      formData.append(name, data[name]);
    }

    fetch(url, {
      method: 'POST',
      body: formData,
    })
    .then(async (response) => {
      let data = await response.json();

      if(data.status === 200){
        this.setState({ uploadingImage: false, showPopup: !this.state.uploadingText });
        return fileName;
      } else {
        if (!this.state.uploadingText) {
          var main = document.getElementById('appContent');
          main.classList.remove('main-overflow-hidden');
        }
        this.setState({ uploadingImage: false });
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      if (!this.state.uploadingText) {
        var main = document.getElementById('appContent');
        main.classList.remove('main-overflow-hidden');
      }
      this.setState({ uploadingImage: false });
      return null;
    });
  }

  getArticleName = () => {
    let article = '';
    if (this.state.title)
      article = this.state.title;
    else
      article = 'Titre inconnu';
    article += ' (';
    if (this.state.artist)
      article += this.state.artist;
    else
      article += 'Artiste inconnu';
    // article += ' - ' + this.createTimeStamp();
    article += ')';

    return article;
  }

  uploadText = async (fileName) => {
    this.setState({ uploadingText: true });
    let article = (this.state.article && this.state.origin != 'wikidata')
      ? this.state.article
      : this.getArticleName();

    let text = '{{Notice d\'œuvre\n';
    if (this.state.title)
      text += `|titre=${this.state.title}\n`;
    if (this.state.article && this.state.origin == 'wikidata')
      text += `|wikidata=${this.state.article}\n`;
    text += `|site_coordonnees=${this.state.lat}, ${this.state.lon}\n`;
    if (this.state.artist)
      text += `|artiste=${this.state.artist}\n`;
    text += `|nature=pérenne\n`;
    if (fileName)
      text += `|image_principale=${fileName}\n`;
    if (this.state.date)
      text += `|inauguration=${this.state.date}\n`;
    if (this.state.description)
      text += `|description=${this.state.description}\n`;
    if (this.state.colors && this.state.colors.length > 0)
      text += `|couleur=${this.state.colors.map(color => color.value).join(';')}\n`;
    if (this.state.materials && this.state.materials.length > 0)
      text += `|materiaux=${this.state.materials.map(material => material.value).join(';')}\n`;
    if (this.state.site)
      text += `|site_nom=${this.state.site}\n`;
    if (this.state.city)
      text += `|site_ville=${this.state.city}\n`;
    if (this.state.department)
      text += `|site_departement=${this.state.department}\n`;
    if (this.state.region)
      text += `|site_region=${this.state.region}\n`;
    if (this.state.country)
      text += `|site_pays=${this.state.country}\n`;
    text += '}}';

    const url = 'https://atlasmuseum.net/w/app/edit.php';
    const body = {
      action: 'edit',
      user: this.state.login,
      password: this.state.pass,
      article,
      text,
    };

    // Paramêtres de requête fetch
    const params = {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(body),
    };

    fetch(url, params)
    .then(response => response.json())
    .then(data => {
      if (data.result === 'success') {
        this.setState({ uploadingText: false, showPopup: !this.state.uploadingImage });
        return article;
      } else {
        if (!this.state.uploadingImage) {
          var main = document.getElementById('appContent');
          main.classList.remove('main-overflow-hidden');
        }
        this.setState({ uploadingText: false });
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      if (!this.state.uploadingImage) {
        var main = document.getElementById('appContent');
        main.classList.remove('main-overflow-hidden');
      }
      this.setState({ uploadingText: false });
      return null;
    });
  }

  upload = async () => {
    var main = document.getElementById('appContent');
    main.classList.add('main-overflow-hidden');

    let fileName = null;
    if (this.state.image) {
      this.setState({ uploadingImage: true });
      fileName = this.createFileName();
      const img = document.getElementById('mainImage');
      fetch(img.src)
      .then(res => res.blob())
      .then(blob => { this.uploadImage(blob, fileName); });
    }

    this.uploadText(fileName);
  }

  goBack = () => {
    this.props.history.push('/');
  }

  toggleColor = (color) => {
    let found = false;
    const newColors = this.state.colors && this.state.colors.length > 0
      ? [...this.state.colors]
      : [];

    if (this.state.colors && this.state.colors.length) {
      for (let i = 0; i < this.state.colors.length; i++) {
        if (this.state.colors[i].value === color.value) {
          newColors.splice(i, 1);
          found = true;
          break;
        }
      }
    }

    if (!found) {
      newColors.push({
        label: color.label,
        value: color.value
      });
    }

    newColors.sort((a, b) => {
      if (a.label < b.label) return -1;
      if (a.label > b.label) return 1;
      return 0;
    });

    this.setState({ colors: newColors });
  }

  toggleMaterial = (material) => {
    let found = false;
    const newMaterials = this.state.materials && this.state.materials.length > 0
      ? [...this.state.materials]
      : [];

    if (this.state.materials && this.state.materials.length > 0) {
      for (let i = 0; i < this.state.materials.length; i++) {
        if (this.state.materials[i].value === material.value) {
          newMaterials.splice(i, 1);
          found = true;
          break;
        }
      }
    }

    if (!found) {
      newMaterials.push({
        label: material.label,
        value: material.value
      });
    }

    newMaterials.sort((a, b) => {
      if (a.label < b.label) return -1;
      if (a.label > b.label) return 1;
      return 0;
    });

    this.setState({ materials: newMaterials });
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
      department,
      region,
      country,
      siteDetails,
      openVideo,
      description,
      uploadingImage,
      uploadingText,
      showPopup,
      showColors,
      showMaterials,
    } = this.state

    return (
      <div className="editContainer">
        { artworkLoading
        ? (
            <DiscLoader />
          )
        : (
            <>
              { openVideo && (
                  <div className="editVideoContainer">
                      <div className="editVideoInner">
                          <video id="video" width="100%" height="100%" className="cameraFrame" src={this.state.videoSrc} autoPlay={true} />
                      </div>
                      <div className="editVideoControl">
                          <div
                              onClick={this.closeVideo}
                              role="button"
                          >
                              <span>OK</span>
                          </div>
                      </div>
                  </div>
              )}
              <div className="editContentContainer">
                { image
                ? <div className="editImageContainer">
                    <img id="mainImage" src={image} alt ="" />
                  </div>
                : <div className="editImagePlaceholder">
                    <div
                      className="editImagePlaceholderInner"
                      onClick={this.takePicture}
                      role="button"
                    >
                      <img src={cameraIcon} alt="" />
                      <span>Prendre une photo</span>
                    </div>
                  </div>
                }
                <div className="editInfosContainer">
                  <table>
                      <tbody>
                          <tr><th>Titre</th><td><input type="text" value={title} onChange={e => this.updateText('title', e.target.value)} /></td></tr>
                          <tr><th>Artiste</th><td><input type="text" value={artist} onChange={e => this.updateText('artist', e.target.value)} /></td></tr>
                          <tr><th>Couleurs</th><td onClick={e => { this.setState({ showColors: true }); }}>
                            {colors ? colors.map(item => item.label).join(', '): ''}
                          </td></tr>
                          <tr><th>Date</th><td><input type="number" value={date} onChange={e => this.updateText('date', e.target.value)} /></td></tr>
                          <tr><th>Description</th><td><input type="text" value={description} onChange={e => this.updateText('description', e.target.value)} /></td></tr>
                          <tr><th>Matériaux</th><td onClick={e => { this.setState({ showMaterials: true }); }}>
                            {materials ? materials.map(item => item.label).join(', '): ''}
                          </td></tr>
                          <tr><th>Nom du site</th><td><input type="text" value={site} onChange={e => this.updateText('site', e.target.value)} /></td></tr>
                          <tr><th>Ville</th><td><input type="text" value={city} onChange={e => this.updateText('city', e.target.value)} /></td></tr>
                          <tr><th>Département</th><td><input type="text" value={department} onChange={e => this.updateText('department', e.target.value)} /></td></tr>
                          <tr><th>Région</th><td><input type="text" value={region} onChange={e => this.updateText('region', e.target.value)} /></td></tr>
                          <tr><th>Pays</th><td><input type="text" value={country} onChange={e => this.updateText('country', e.target.value)} /></td></tr>
                      </tbody>
                  </table>
                </div>
              </div>

              <div className="editFooterContainer">
                  <ul>
                      <li><a href="/app">Annuler</a></li>
                      <li>Sauvegarder</li>
                      <li role="button" onClick={this.upload}>Envoyer</li>
                  </ul>
              </div>
              <ColorsPicker
                  display={showColors}
                  colors={this.state.colors}
                  onClose={e => { this.setState({ showColors: false });}}
                  toggleColor={this.toggleColor}
                />
              <MaterialsPicker
                  display={showMaterials}
                  materials={this.state.materials}
                  onClose={e => { this.setState({ showMaterials: false });}}
                  toggleMaterial={this.toggleMaterial}
              />
              { (uploadingText || uploadingImage) && (
                <div className="editLoaderContainer">
                  <DiscLoader />
                </div>
              )}
              { showPopup && (
                <div
                  className="popupLogoutContainer"
                  role="button"
                  onClick={this.goBack}
                >
                  <div
                    className="popupLogoutContent"
                    role="button"
                    onClick={(e) => { e.stopPropagation(); }}
                  >
                    <p>Votre contribution a été transmise.</p>
                    <p className="popupLogoutButtonsContainer">
                      <button onClick={this.goBack}>OK</button>
                    </p>
                  </div>
                </div>
              )}
            </>
          )
        }
      </div>
    )
  }
}

Edit.propTypes = {
  artworkLoading: PropTypes.bool.isRequired,
  artworkContent: PropTypes.instanceOf(Array).isRequired,
}

Edit.defaultProps = {
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
)(withRouter(Edit))
