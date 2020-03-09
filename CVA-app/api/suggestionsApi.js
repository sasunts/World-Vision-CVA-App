import firebase from "firebase";
import "firebase/firestore";

export function createSuggestion(suggestion, createComplete) {
    console.log("api: " + suggestion);
    firebase
        .firestore()
        .collection("suggestions")
        .add({
            commitmentId: suggestion.commitmentId,
            commitment: suggestion.commitment,
            description: suggestion.description,
            upvotes: [],
            downvotes: [],
            upvotesCount: 0,
            downvotesCount: 0,
            creationDate: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(data => data.get())
        .then(suggestionData => createComplete(suggestionData.data()))
        .catch(error => console.log(error));
}

export async function getSuggestions(commitmentId, suggestionsFetched) {
    var suggestions = [];
    var data = await firebase
        .firestore()
        .collection("suggestions")
        .orderBy("creationDate")
        .get();

    data.forEach(document => {
        let temp = document.data();
        const suggestion = {
            id: document.id,
            commitmentId: temp.commitmentId,
            creationDate: temp.creationDate,
            commitment: temp.commitment,
            description: temp.description,
            upvotes: temp.upvotes,
            downvotes: temp.downvotes,
            upvotesCount: temp.upvotes.length,
            downvotesCount: temp.downvotes.length
        };
        if (commitmentId == temp.commitmentId)
        {
            suggestions.push(suggestion);
        }
    });
    suggestionsFetched(suggestions);
}

export async function upvote(suggestion, updateComplete) {
    var data = await firebase
        .firestore()
        .collection("suggestions")
        .orderBy("creationDate")
        .get();

    alreadyUpvoted = false;
    
    data.forEach(document => {
        let temp = document.data();
        if (document.id == suggestion.id)
        {
            temp.upvotes.forEach( userId => {
                if (userId == firebase.auth().currentUser.uid){
                    alreadyUpvoted = true;
                }
            });

            temp.downvotes.forEach( userId => {
                if (userId == firebase.auth().currentUser.uid){
                    suggestion.downvotes.splice(suggestion.downvotes.indexOf(userId), 1);
                }
            });
        }
    });

    if (!alreadyUpvoted){
        suggestion.upvotes.push(firebase.auth().currentUser.uid)
        await firebase
        .firestore()
        .collection("suggestions")
        .doc(suggestion.id)
        .set(suggestion)
        .then(() => updateComplete(suggestion))
        .catch(error => console.log(error));
    }
}

export async function downvote(suggestion, updateComplete) {
    var data = await firebase
        .firestore()
        .collection("suggestions")
        .orderBy("creationDate")
        .get();

    alreadyDownvoted = false;
    
    data.forEach(document => {
        let temp = document.data();
        if (document.id == suggestion.id)
        {
            temp.downvotes.forEach( userId => {
                if (userId == firebase.auth().currentUser.uid){
                    alreadyDownvoted = true;
                }
            });

            temp.upvotes.forEach( userId => {
                if (userId == firebase.auth().currentUser.uid){
                    suggestion.upvotes.splice(suggestion.upvotes.indexOf(userId), 1);
                }
            });
        }
    });

    if (!alreadyDownvoted){
        suggestion.downvotes.push(firebase.auth().currentUser.uid)
        await firebase
        .firestore()
        .collection("suggestions")
        .doc(suggestion.id)
        .set(suggestion)
        .then(() => updateComplete(suggestion))
        .catch(error => console.log(error));
    }
}
