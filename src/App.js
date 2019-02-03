import React, { Component } from 'react';
import _config from'./config';
import './App.css';
import Nav from './Nav/Nav'
import Query from'./Query/Query'
import PlateViewer from './PlateViewer/PlateViewer'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends Component {

  constructor() {
    super()

    this.state = {
      queried: false,
      imageURL: null,
      loading: false
    }
  }

  submitText = (text) => {
    if (text.length === 0) {
      return null
    } else {
      this.setState({loading: true})
      this.requestImage(text).then((data) => {
        try {
        console.log('Received URL: ' + data.image)
        this.setState({
          queried: true,
          loading: false,
          imageURL: data.image
        })
      } catch (e) {
        console.log("Failed to get response from API: + " + data)

      }
      })
    }
  }

  resetQuery = () => {
    this.setState({
      queried: false,
      loading: false,
      imageURL: null
    })
  }

  requestImage = async (text) => {
    let response
    console.log(_config)
    console.log('Requesting Image with text: ' + text)
    try {
      response = await fetch('https://vts7a6o8y5.execute-api.us-west-2.amazonaws.com/prod' + '/requestplate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text
        })
      })
    } catch (e) {
      console.log('Caught error while requesting image: ' + e)
    }
    let data
    try {
      data = await response .json()
    } catch (e) {
      console.log('Caught error while waiting for response: ' + e)
    }
    return data
  }

  render() {
    return (
      <Router>
          <div>
              <Nav
                  userHasQueried={this.state.queried} />
              <Query
                  submitText={this.submitText}
                  logoSizeIsSmall={this.state.queried} 
                  resetQuery={this.resetQuery}/>
                  <Route exact path="/" render = {() => (
                      <PlateViewer
                          loading={this.state.loading}
                          imageURL={this.state.imageURL}
                          queried={this.state.queried}
                      />
                  )}/>
          </div>
      </Router>
    );
  }
  
  componentDidMount() {
  }
}

export default App;
