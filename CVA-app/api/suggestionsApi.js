import firebase from 'firebase';
import 'firebase/firestore';    

export function createSuggestion(suggestion, createComplete){
    console.log("api: " + suggestion)
    firebase.firestore().collection('suggestions').add({
        commitment: suggestion.commitment,
        description: suggestion.description,
        upvotes: 0,
        creationDate: firebase.firestore.FieldValue.serverTimestamp()
    }).then((data) => data.get()
    ).then((suggestionData) => createComplete(suggestionData.data()))
    .catch((error) => console.log(error));
}

export async function getSuggestionsByDate(suggestionsFetched){
    var suggestions = [];
    var data = await firebase.firestore().collection('suggestions').orderBy('creationDate').get()

    data.forEach((document) => {
        let temp = document.data();
        const suggestion = {
            id: document.id,
            creationDate: temp.creationDate,
            commitment: temp.commitment,
            description: temp.description,
            upvotes: temp.upvotes
        }
        suggestions.push(suggestion)
    });
    suggestionsFetched(suggestions);
}
