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

    groupID = (userEmail, callback) => {
        var data = firebase
            .firestore()
            .collection("users")
            .get()
            .then(function(doc) {
                doc.forEach(document => {
                    let temp = document.data();

                    if (userEmail == temp.email) {
                        const groupID = temp.groupID;
                        callback(groupID);
                    }
                });
            });
    };

    getUsers(userEmail, callback) {
        var users = [];
        var data = firebase
            .firestore()
            .collection("users")
            .get()
            .then(function(doc){
                doc.forEach(document => {
                    let temp = document.data();
                    console.log(temp.email);
                    const user = {
                        email: temp.email,
                        name: temp.name
                    };

                    if (temp.email != userEmail)
                    {
                        users.push(user);
                    }
                    
                });

                callback(users);
            })
    }

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

    refOn = (listenerOnListinerOff, chat, groupID, userEmail, callback) => {
        var willThisWork = this.ref
            .limitToLast(20)
            .orderBy("createdAt")
            .onSnapshot(function(querySnapshot) {
                querySnapshot.docChanges().forEach(function(change) {
                    if (change.doc.data().chat.includes(chat) && (chat === "global"|| chat === groupID || change.doc.data().chat.includes(userEmail))){
                        if (change.type === "added") {
                            const { createdAt, text, user } = change.doc.data();
    
                            const { key: id } = change;
                            const { key: _id } = change; //needed for giftedchat
    
                            const message = {
                                id,
                                _id,
                                createdAt,
                                text,
                                user
                            };
    
                            callback(message);
                        }
                    }
                });
            });
        if (listenerOnListinerOff == 0) {
            willThisWork();
            console.log("Turned off listiner daddy");
        }
    };

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    // send the message to the Backend
    send(messages,chat,userEmail){
        console.log(chat);
        const messageSentAt = Date.now();
        console.log("Made this at: ", messageSentAt);
        for (let i = 0; i < messages.length; i++) {
            const { _id, text, user,  createdAt } = messages[i];

            this.ref
                .add({
                    _id,
                    text,
                    user,
                    chat: [chat, userEmail],
                    createdAt: messageSentAt
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
