import React, { Component } from 'react';
import firebase from 'firebase'
import { View, Text, StyleSheet } from 'react-native';
import Loading from './components/Loading';
import LoginForm from './components/LoginScreen/LoginForm';
import Home from './components/Home';


class App extends Component{
  
  state={
    loggedIn:null
  }

  componentDidMount(){
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
          if(user){
             this.setState({
               loggedIn:true
             })
          }else{
            this.setState({
              loggedIn:false
            })
          }
     })

   
  }


  renderContent = () =>{
    switch(this.state.loggedIn){
      case false:
        return <LoginForm/>
      case true:
        return <Home/>
      default:
        return <Loading/>


    }
  }

  render(){
    return (
      <View style={styles.container}>
       {this.renderContent()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: "50%",
    padding: 20,
    flex: 1,
    height:'100%',
    width:'100%',
    backgroundColor: '#b3e5fc' 
  },
});

export default App;