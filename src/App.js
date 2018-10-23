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
        console.log('Received URL: ' + data.image)
        this.setState({
          queried: true,
          loading: false,
          imageURL: data.image
        })
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
      response = await fetch('https://tbrz9z67od.execute-api.us-west-2.amazonaws.com/prod' + "/encrypttext", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
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
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
}

export default App;
