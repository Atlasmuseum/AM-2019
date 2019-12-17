import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getPage } from '../../../actions/index'
import DiscLoader from '../discLoader'

import './atlasmuseumPageLoader.css'

/**
 * Chargement d'une page sur atlasmuseum
 *
 * @param {string} page - Nom de la page à récupérer
 */
export class AtlasmuseumPageLoader extends Component {
  componentDidMount() {
    const {
      getPage,
    } = this.props

    getPage({ page: 'Actualités' })
  }

  render() {
    const {
      pageLoading,
      pageContent
    } = this.props

    return (
      <div className="atlasmuseumPageLoader">
        { pageLoading
        ? (
            <DiscLoader />
          )
        : (
            <div dangerouslySetInnerHTML={{ __html:  pageContent}}/>
          )
        }
      </div>
    )
  }
}

AtlasmuseumPageLoader.propTypes = {
  pageLoading: PropTypes.bool.isRequired,
  pageContent: PropTypes.instanceOf(Array).isRequired,
  page: PropTypes.string,
}

AtlasmuseumPageLoader.defaultProps = {
  page: null,
}

function mapStateToProps(state) {
  return {
    pageLoading: state.apiLoading,
    pageContent: state.apiResults,
  }
}

function mapDispatchToProps(dispatch, state) {
  return {
    getPage: page => dispatch(getPage(page)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AtlasmuseumPageLoader)
