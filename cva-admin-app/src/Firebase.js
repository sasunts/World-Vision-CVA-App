import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBED4E6DHNaXml61ENPAvOcyZUMSd-ePeU",
	authDomain: "cva-worldvision.firebaseapp.com",
	databaseURL: "https://cva-worldvision.firebaseio.com",
	projectId: "cva-worldvision",
	storageBucket: "cva-worldvision.appspot.com",
	messagingSenderId: "615471052636",
	appId: "1:615471052636:web:9df5e821e9981b4fc47399"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
