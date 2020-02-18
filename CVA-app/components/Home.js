import * as React from 'react';
import firebase from 'firebase'
import { View, Text, StyleSheet,TouchableOpacity, Button } from 'react-native';
import styles from '../assets/styleSheet'

const Home = ({navigation}) => {
  // firebase.auth().signOut();
  return (
          <View style={styles.container}>
              <View style={styles.container} >
                  <Text style={styles.heading} >
                      Home Page To be designed and styled..
                  </Text>
                  <TouchableOpacity style={styles.buttonContainer} onPress={()=>navigation.navigate('Action-Plan')}>
                    <Text style={ styles.buttonText} >Action Plan</Text> 
                  </TouchableOpacity>
                  <View style={{paddingTop:20}}></View>
                  <TouchableOpacity style={styles.buttonContainer} onPress={()=>navigation.navigate('Govt-Commitments-Home')}>
                    <Text style={ styles.buttonText} >Govt Commitments</Text> 
                  </TouchableOpacity>
                  <View style={{paddingTop:20}}></View>
                 <TouchableOpacity style={styles.buttonContainer} onPress={()=> firebase.auth().signOut()} >
                      <Text style={ styles.buttonText} >Logout</Text>
                  </TouchableOpacity>
              </View>
          
          </View>
  );
}

export default Home;