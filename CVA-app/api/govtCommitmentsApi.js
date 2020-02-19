import firebase from 'firebase';
import 'firebase/firestore';    

export function createGovtCommitment(govtCommitment, createComplete){
    console.log("api: " + govtCommitment)
    firebase.firestore().collection('govtCommitments').add({
        title: govtCommitment.title,
        description: govtCommitment.description,
        inputTypes: govtCommitment.inputTypes,
        govtStandards: govtCommitment.govtStandards,
        scoreOverview: ":) (test data)",
        creationDate: firebase.firestore.FieldValue.serverTimestamp()
    }).then((data) => data.get()
    ).then((govtCommitmentData) => createComplete(govtCommitmentData.data()))
    .catch((error) => console.log(error));
}

export async function getGovtCommitmentsByDate(commitmentsFetched){
    var govtCommitments = [];
    var data = await firebase.firestore().collection('govtCommitments').orderBy('creationDate').get()

    data.forEach((document) => {
        let temp = document.data();
        const commitment = {
            id: document.id,
            creationDate: temp.creationDate,
            title: temp.title,
            description: temp.description,
            inputTypes: temp.inputTypes,
            govtStandards: temp.govtStandards,
            scoreOverview: temp.scoreOverview
        }
        govtCommitments.push(commitment)
    });
    commitmentsFetched(govtCommitments);
}
