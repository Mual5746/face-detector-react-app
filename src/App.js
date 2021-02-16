
import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: ''//'YOUR API KEY HERE'
 });

const particlesOptions = {

  Particles: {
    number :{
      value: 30,
      density: {
        enble: true,
        value_area: 800
      }
    }
  }
}

class App extends Component  {
  constructor() {
    super();
    this.state = {
      // https://i.pinimg.com/236x/cb/8a/cc/cb8accb4955dabd87a4bfc8a6435773c.jpg
      input: '', // användarens input
      imageUrl: '', 
    }
  }

  onInputChange = (event) => {
    //console.log(event.target.value)    
    this.setState({input: event.target.value});
  }
  onButtonSubmit = () => {
    //console.log ('click')
    this.setState({imageUrl: this.state.input});
      
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bouding_box);
    },
    function(err){

    }
  );
      /*.then(response => {
        console.log('hi', response)
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
      */
  }



  render () {
    return (
    <div className="App"> 
        < Particles className = 'particles'
        params ={particlesOptions} />      
      < Navigation />
      < Logo />
      < Rank />
      < ImageLinkForm 
      onInputChange = {this.onInputChange} 
      onButtonSubmit = {this.onButtonSubmit} 
      /> 
      <FaceRecognition imageUrl={this.state.imageUrl} />
           
    </div>
  );
 }
}

export default App;
