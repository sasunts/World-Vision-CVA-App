import firebase from 'firebase';
import 'firebase/firestore';    

export function createAction(action, createComplete){
    firebase.firestore().collection('actionPlans').add({
        title: action.title,
        description: action.description,
        carriedOutBy: action.carriedOutBy,
        monitoredBy: action.monitoredBy,
        comments: action.comments,
        deadline: action.deadline,
        creationDate: firebase.firestore.FieldValue.serverTimestamp()
    }).then((data) => data.get()
    ).then((actionData) => createComplete(actionData.data()))
    .catch((error) => console.log(error));
}

export async function getActions(actionsFetched){
    var actionPlans = [];
    var data = await firebase.firestore().collection('actionPlans').orderBy('creationDate').get()

    data.forEach((document) => {
        actionPlans.push(document.data())
    });

    actionsFetched(actionPlans);
}