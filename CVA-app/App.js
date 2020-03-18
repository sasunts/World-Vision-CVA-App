import 'react-native-gesture-handler';
import React, { Component } from 'react';
import firebase from 'firebase'
import Loading from './components/Loading';
import LoginForm from './components/LoginScreen/LoginForm';
import Navigator from './routes/homeStack';
console.disableYellowBox = true;

class App extends Component {

  state = {
    loggedIn: null
  }

  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyBED4E6DHNaXml61ENPAvOcyZUMSd-ePeU",
      authDomain: "cva-worldvision.firebaseapp.com",
      databaseURL: "https://cva-worldvision.firebaseio.com",
      projectId: "cva-worldvision",
      storageBucket: "cva-worldvision.appspot.com",
      messagingSenderId: "615471052636",
      appId: "1:615471052636:web:9df5e821e9981b4fc47399"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          loggedIn: true
        })
      } else {
        this.setState({
          loggedIn: false
        })
      }
    })


  }


  renderContent = () => {
    switch (this.state.loggedIn) {
      case false:
        return <LoginForm />
      case true:
        return <Navigator />
      default:
        return <Loading />
    }
  }

  render() {
    return (this.renderContent()
    );
  }



};

export default App;
