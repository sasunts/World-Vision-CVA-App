import React, { Component } from 'react';
import firebase from 'firebase'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

const Home = () => {
    return (
        <View style={styles.container}>
            <View style={styles.container} >
                <Text style={styles.heading} >
                     Login Successful page //TODO: Should be home page
                </Text>
               <TouchableOpacity style={{padding:20 }} onPress={()=> firebase.auth().signOut()} >
                     <Text style={{color:'#1B9CFC'}} >Logout</Text>
               </TouchableOpacity>
            </View>
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'  
    },
    heading:{
       fontSize:22,
       color:'black',
       marginBottom:10
    },
    content:{
      marginTop:10,
      fontSize:19,
      
    }
});

export default Home;