import firebase from 'firebase';
import 'firebase/firestore';

export function createAction(action, createComplete) {
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

export async function getActions(actionsFetched) {
  var actionPlans = [];
  var data = await firebase.firestore()
  .collection('actionPlans')
  .orderBy('creationDate')
  .get()

  // Formating to include the doc id in the object
  // might be a better way of doing this.
  data.forEach((document) => {
    let temp = document.data();
    const actionPlan = {
      id: document.id,
      title: temp.title,
      description: temp.description,
      carriedOutBy: temp.carriedOutBy,
      monitoredBy: temp.monitoredBy,
      comments: temp.comments,
      deadline: temp.deadline,
      creationDate: temp.creationDate
    }
    actionPlans.push(actionPlan)
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
