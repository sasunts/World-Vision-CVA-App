import firebase from "firebase";
import "firebase/firestore";

export async function fetchUserInfo(userEmail, showCurrentUserInfo) {
    var currentUserInfo = [];

    var data = await firebase
        .firestore()
        .collection("users")
        .get();

    data.forEach(document => {
        let temp = document.data();
        if (userEmail == temp.email) {
            const user = {
                email: temp.email,
                name: temp.name,
                type: temp.type
            };
            currentUserInfo.push(user);
        }
    });
    showCurrentUserInfo(currentUserInfo);
}

export function sendMessage(messageBeingSent, createComplete) {
    const messageSentAt = firebase.firestore.FieldValue.serverTimestamp();

    firebase
        .firestore()
        .collection("Messages")
        .add({
            _id: messageBeingSent._id,
            text: messageBeingSent.text,
            createdAt: messageSentAt,
            user: messageBeingSent.user
        })
        .then(data => data.get())
        .then(messageData => createComplete(messageData.data()))
        .catch(error => console.log(error));
}

export async function getMessages(messagesFetched) {
    var messages = [];
    var data = await firebase
        .firestore()
        .collection("Messages")
        .orderBy("createdAt", "desc")
        .limitToLast(5)
        .get();

    data.forEach(document => {
        let temp = document.data();
        const message = {
            _id: temp._id,
            text: temp.text,
            // createdAt: temp.createdAt.toDate(),
            user: temp.user
        };
        messages.push(message);
    });
    messagesFetched(messages);
}

export function updateChat(callback) {
    var listenForChanges = firebase
        .firestore()
        .collection("Messages")
        .orderBy("createdAt", "desc")
        .onSnapshot(function(querySnapshot) {
            var messages = [];
            querySnapshot.forEach(document => {
                let temp = document.data();
                const message = {
                    _id: temp._id,
                    text: temp.text,
                    // createdAt: temp.createdAt.toDate(),
                    user: temp.user
                };
                messages.push(message);
            });
            callback(messages);
            messages = [];
        });
}
