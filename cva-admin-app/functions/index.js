
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// admin.initializeApp(functions.config().firebase);

var serviceAccount = require("./cva-worldvision-firebase-adminsdk-x9032-886a4b9203.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cva-worldvision.firebaseio.com"
});

// const deleteUser = firebase.functions().httpsCallable("deleteUser");
//
// 		deleteUser({ email: "test@tcd.ie" }).then(res => {
// 			console.log(res.data);
// 		});



// admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.deleteUser = functions.https.onCall((data, context) => {
	// const email = request.query.text;
// const number = Math.round(Math.random() * 100);
// return number.toString();

	console.log(data.email);
  const user = admin.auth.getUserByEmail("test@tcd.ie");
  console.log(user)
  // admin.auth().deleteUser(user.uid)
  // admin.auth().getUserByEmail(data.email)
  // .then(function(userRecord) {
  //   // See the UserRecord reference doc for the contents of userRecord.
  //   console.log('Successfully fetched user data:', userRecord.toJSON());
  // })
  // .catch(function(error) {
  //  console.log('Error fetching user data:', error);
  // });

})
