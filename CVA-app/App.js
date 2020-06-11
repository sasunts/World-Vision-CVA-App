import "react-native-gesture-handler";
import React, { Component } from "react";
import firebase from "firebase";
import Loading from "./components/Loading";
import LoginForm from "./components/LoginScreen/LoginForm";
import Navigator from "./routes/homeStack";
console.disableYellowBox = true;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: null
    };
  }

  //Firebase Configuration. PLEASE CHANGE THIS TO PRODUCTION KEYS WHEN LAUNCHING APP.
  componentDidMount() {
    var firebaseConfig = {
      // INSERT YOUR OWN FIREBASE API CONFIG HERE
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    // Log in cases
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          loggedIn: true
        });
      } else {
        this.setState({
          loggedIn: false
        });
      }
    });
  }
  //Render UI
  renderContent = () => {
    switch (this.state.loggedIn) {
      case false:
        return <LoginForm />;
      case true:
        return <Navigator />;
      default:
        return <Loading />;
    }
  };

  render() {
    return this.renderContent();
  }
}

export default App;
