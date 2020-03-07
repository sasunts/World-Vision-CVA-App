import firebase from "firebase";
import "firebase/firestore";

export function gradeCommitment(grade, createComplete) {
    console.log("api: " + grade);
    firebase
        .firestore()
        .collection("grades")
        .add({
            commitmentId: grade.commitmentId,
            commitment: grade.commitment,
            commitmentGrade: grade.commitmentGrade,
            gradeDate: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(data => data.get())
        .then(gradeData => createComplete(gradeData.data()))
        .catch(error => console.log(error));
}

export async function getGradesByCommitmentId(commitmentId, gradesFetched) {
    var grades = [];
    var data = await firebase
        .firestore()
        .collection("grades")
        .orderBy("gradeDate")
        .get();

    data.forEach(document => {
        let temp = document.data();
        if (commitmentId == temp.commitmentId) {
            const grade = {
                id: document.id,
                commitmentId: temp.commitmentId,
                gradeDate: temp.gradeDate,
                commitmentGrade: temp.commitmentGrade,
                commitment: temp.commitment
            };
            grades.push(grade);
        }
    });
    gradesFetched(grades);
}
