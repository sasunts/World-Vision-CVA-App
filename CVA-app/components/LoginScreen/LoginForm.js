//import liraries
import React from "react";
import { View, Image } from "react-native";
import Email_Password from "./Email_Password";
import styles from "../../assets/styleSheet";

// Render Login Form
const LoginForm = () => {
  return (
    <View style={styles.containerLogin}>
      <Image
        source={require("../../assets/images/wv-logo.png")}
        style={{
          width: "80%",
          height: 115
        }}
      />
      <View style={styles.email_Password}>
        <Email_Password />
      </View>
    </View>
  );
};

//make this component available to the app
export default LoginForm;
