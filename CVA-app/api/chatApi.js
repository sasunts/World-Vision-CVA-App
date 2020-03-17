import firebase from "firebase";
import "firebase/firestore";

class FirebaseSvc {
    constructor() {}

    userName = (userEmail, callback) => {
        var data = firebase
            .firestore()
            .collection("users")
            .get()
            .then(function(doc) {
                doc.forEach(document => {
                    let temp = document.data();

                    if (userEmail == temp.email) {
                        const user = {
                            email: temp.email,
                            name: temp.name,
                            type: temp.type
                        };
                        callback(user);
                    }
                });
            });
    };

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get ref() {
        return firebase.firestore().collection("Messages");
    }

    parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: id } = snapshot;
        const { key: _id } = snapshot; //needed for giftedchat
        const timestamp = new Date(numberStamp);

        const message = {
            id,
            _id,
            timestamp,
            text,
            user
        };

        return message;
    };

    refOn = callback => {
        this.ref.onSnapshot(function(querySnapshot) {
            var messages = [];

            querySnapshot.forEach(function(doc) {
                const { timestamp: numberStamp, text, user } = doc.data();
                const { key: id } = doc;
                const { key: _id } = doc; //needed for giftedchat
                const timestamp = new Date(numberStamp);
                console.log(timestamp);

                const message = {
                    id,
                    _id,
                    timestamp,
                    text,
                    user
                };

                // messages.push(doc.data());
                callback(message);
            });
        });
    };

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    // send the message to the Backend
    send = messages => {
        const messageSentAt = firebase.firestore.FieldValue.serverTimestamp();
        console.log("Made this at: ", messageSentAt);
        for (let i = 0; i < messages.length; i++) {
            const { text, user, createdAt } = messages[i];

            this.ref
                .add({
                    text,
                    user,
                    createdAt
                })
                .catch(error => console.log(error));
        }
    };

    // refOff() {
    //     this.ref.off();
    // }
}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;
