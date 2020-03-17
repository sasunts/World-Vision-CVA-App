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
        return firebase.database().ref("Messages");
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
        this.ref
            .limitToLast(20)
            .on("child_added", snapshot => callback(this.parse(snapshot)));
    };

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    // send the message to the Backend
    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = {
                text,
                user,
                createdAt: this.timestamp
            };
            this.ref.push(message);
        }
    };

    refOff() {
        this.ref.off();
    }
}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;
