import firebase from "firebase";
import "firebase/firestore";

export async function getUser(userID, actionsFetched) {
    var userInfo = [];

    var data = await firebase
        .firestore()
        .collection("users")
        .doc(userID)
        .get();


    userInfo.push(data.data());
    actionsFetched(userInfo);
}

export function updateUser(user, updateComplete) {
    firebase
        .firestore()
        .collection("users")
        .doc(user.id)
        .set(user)
        .then(() => updateComplete(action))
        .catch(error => console.log(error));
}
