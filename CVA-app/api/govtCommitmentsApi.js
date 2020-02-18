import firebase from 'firebase';
import 'firebase/firestore';    

export function createGovtCommitment(govtCommitment, createComplete){
    firebase.firestore().collection('govtCommitments').add({
        title: govtCommitment.title,
        description: govtCommitment.description,
        standards: govtCommitment.standards,
        creationDate: firebase.firestore.FieldValue.serverTimestamp()
    }).then((data) => data.get()
    ).then((govtCommitmentData) => createComplete(govtCommitmentData.data()))
    .catch((error) => console.log(error));
}

export async function getGovtCommitmentsByDate(commitmentsFetched){
    var govtCommitments = [];
    var data = await firebase.firestore().collection('govtCommitments').orderBy('creationDate').get()

    data.forEach((document) => {
        govtCommitments.push(document.data())
    });
    commitmentsFetched(govtCommitments);
}
