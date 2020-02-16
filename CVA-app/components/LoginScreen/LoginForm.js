//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Email_Password from './Email_Password';

// create a component
const LoginForm = () => {
    return (
        <View style={styles.container}>
            <View style={styles.email_Password}>
                <Email_Password/>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingTop:"50%",
        flex: 1,
        justifyContent:'center',
    },
    
    email_Password:{
        flex:2
    }
});

//make this component available to the app
export default LoginForm;