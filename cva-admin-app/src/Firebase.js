import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	// apiKey: "AIzaSyBED4E6DHNaXml61ENPAvOcyZUMSd-ePeU",
	// authDomain: "cva-worldvision.firebaseapp.com",
	// databaseURL: "https://cva-worldvision.firebaseio.com",
	// projectId: "cva-worldvision",
	// storageBucket: "cva-worldvision.appspot.com",
	// messagingSenderId: "615471052636",
	// appId: "1:615471052636:web:9df5e821e9981b4fc47399"

	// TEST
	apiKey: "AIzaSyCwuEYs-rPnXEFeuPxzREX1nqy-4KwHh6w",
	authDomain: "test-50175.firebaseapp.com",
	databaseURL: "https://test-50175.firebaseio.com",
	projectId: "test-50175",
	storageBucket: "test-50175.appspot.com",
	messagingSenderId: "197522020961",
	appId: "1:197522020961:web:e9636c7c51d0087829a820"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export default firebase;
