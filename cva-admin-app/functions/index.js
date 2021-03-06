const functions = require("firebase-functions");
const admin = require("firebase-admin");
// admin.initializeApp(functions.config().firebase);

var serviceAccount = require("./cva-worldvision-firebase-adminsdk-x9032-886a4b9203.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://cva-worldvision.firebaseio.com"
});

exports.deleteUser = functions.https.onCall((data, context) => {
	admin
		.auth()
		.getUserByEmail(data.email)
		.then(function(user) {
			console.log("Successfully fetched user data:", user.toJSON());
			admin.auth().deleteUser(user.uid);
			return null;
		})
		.catch(function(error) {
			console.log("Error fetching user data:", error);
		});
});

exports.addUser = functions.https.onCall((data, context) => {
	return admin
		.auth()
		.createUser({
			email: data.email,
			password: data.password
		})
		.then(function(user) {
			return "user added";
		})
		.catch(function(error) {
			return error;
		});
});
