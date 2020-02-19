import firebase from "firebase";
import "firebase/firestore";

export function createAction(action, createComplete) {
  firebase
    .firestore()
    .collection("actionPlans")
    .add({
      title: action.title,
      description: action.description,
      carriedOutBy: action.carriedOutBy,
      monitoredBy: action.monitoredBy,
      comments: action.comments,
      deadline: action.deadline,
      creationDate: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(data => data.get())
    .then(actionData => createComplete(actionData.data()))
    .catch(error => console.log(error));
}

export async function getActions(actionsFetched) {
  var actionPlans = [];
  var data = await firebase
    .firestore()
    .collection("actionPlans")
    .orderBy("creationDate")
    .get();

  data.forEach(document => {
    actionPlans.push(document.data());
  });

  actionsFetched(actionPlans);
}

export function updateAction(action, updateComplete) {
  action.creationDate = firebase.firestore.FieldValue.serverTimestamp();
  firebase
    .firestore()
    .collection("actionPlans")
    .doc(action.id)
    .set(action)
    .then(() => updateComplete(action))
    .catch(error => console.log(error));
}

export function deleteAction(action, deleteComplete) {
  firebase
    .firestore()
    .collection("actionPlans")
    .doc(action.id)
    .delete()
    .then(() => deleteComplete())
    .catch(error => console.log(error));
}
