import "react-native-gesture-handler";
import React, { Component } from "react";
import firebase from "firebase";
import { View, Text, StyleSheet } from "react-native";
import Loading from "./components/Loading";
import LoginForm from "./components/LoginScreen/LoginForm";
import Home from "./components/Home";
import Navigator from "./routes/homeStack";

class App extends Component {
    state = {
        loggedIn: null
    };

    componentDidMount() {
        var firebaseConfig = {
            apiKey: "AIzaSyBgq7pJF8_D2kdE8UAdTlKQAgfbOOCXG7E",
            authDomain: "tomscva.firebaseapp.com",
            databaseURL: "https://tomscva.firebaseio.com",
            projectId: "tomscva",
            storageBucket: "tomscva.appspot.com",
            messagingSenderId: "944453411118",
            appId: "1:944453411118:web:6e8b7c6ba48c0a60ef9abf",
            measurementId: "G-0FDDH4XPXG"
        };
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

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

const styles = StyleSheet.create({
    container: {}
});

export default App;
