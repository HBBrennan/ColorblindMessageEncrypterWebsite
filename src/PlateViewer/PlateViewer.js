import React from 'react'
import './PlateViewer.css'
import Arrow from '../assets/arrow.png'
import LoadingGif from '../assets/giphy.gif'
import PropTypes from 'prop-types'
 
const PlateViewer = (props) => {
    console.log(props)
    if (props.loading) {
        return (
            <div className="results-list-container">
                <img src={LoadingGif} className="loading-gif" />
            </div>
        )
    } else if (props.imageURL) {
        return (
            <img src={props.imageURL} className="plate" />
        )
    } else if (props.queried) {   
        return (
            <div className="results-list-container">
                <div className="no-results-found">
                    <h2>Failed to request image.</h2>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="results-list-container">
                <h2>Enter the message you want encrypted!</h2>
                <img className="arrow" src={Arrow}/>
            </div>
        )
    }
}

PlateViewer.propTypes = {
    loading: PropTypes.bool.isRequired,
    queried: PropTypes.bool.isRequired
}
export default PlateViewer