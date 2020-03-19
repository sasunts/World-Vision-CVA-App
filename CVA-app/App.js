import 'react-native-gesture-handler';
import React, { Component } from 'react';
import firebase from 'firebase'
import { getUser } from "./api/profileApi";
import Loading from './components/Loading';
import LoginForm from './components/LoginScreen/LoginForm';
import Navigator from './routes/homeStack';
import OnBoard from './routes/OnBoardingStack';
console.disableYellowBox = true;

class App extends Component {
  constructor(props) {
    super(props);

<<<<<<< HEAD
    this.state = {
      loggedIn: null,
      firstLogin: false,
      userInfo: []
    }

  }

  onActionsFetched = userInfo => {
    this.setState(prevState => ({
      userInfo: (prevState.userInfo = userInfo)
    }));
  };
=======
    componentDidMount() {
        var firebaseConfig = {
            // apiKey: "AIzaSyBgq7pJF8_D2kdE8UAdTlKQAgfbOOCXG7E",
            // authDomain: "tomscva.firebaseapp.com",
            // databaseURL: "https://tomscva.firebaseio.com",
            // projectId: "tomscva",
            // storageBucket: "tomscva.appspot.com",
            // messagingSenderId: "944453411118",
            // appId: "1:944453411118:web:6e8b7c6ba48c0a60ef9abf",
            // measurementId: "G-0FDDH4XPXG"
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
>>>>>>> govermentTracking

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

    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        await getUser(user.email, this.onActionsFetched)
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
        console.log(this.state.userInfo)
        if (this.state.firstLogin == this.state.userInfo[0].signedUp) {

          return <OnBoard />
        } else {
          return <Navigator />
        }

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
