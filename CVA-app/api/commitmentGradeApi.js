import firebase from "firebase";
import "firebase/firestore";

export function gradeCommitment(grade, createComplete) {
    console.log("api: " + grade);
    var foundCorrespondingDocument = false;
    firebase
        .firestore()
        .collection("grades")
        .get()
        .then(snap => {
            var size = snap.size;

            if (snap.empty) {
                firebase
                    .firestore()
                    .collection("grades")
                    .add({
                        commitmentId: grade.commitmentId,
                        commitment: grade.commitment,
                        userId: firebase.auth().currentUser.uid,
                        commitmentGrade: grade.commitmentGrade,
                        gradeDate: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then(data => data.get())
                    .then(gradeData => createComplete(gradeData.data()))
                    .catch(error => console.log(error));
            } else if (snap.empty == false) {
                snap.forEach(document => {
                    let temp = document.data();

                    if (
                        grade.userId == temp.userId &&
                        grade.commitmentGrade == temp.commitmentGrade &&
                        grade.commitmentId == temp.commitmentId
                    ) {
                        foundCorrespondingDocument = true;
                        console.log(
                            "User Already Graded This Commitment Same Way"
                        );
                    } else if (
                        grade.userId == temp.userId &&
                        grade.commitmentGrade != temp.commitmentGrade &&
                        grade.commitmentId == temp.commitmentId
                    ) {
                        foundCorrespondingDocument = true;
                        console.log("Updating Grade Now");
                        grade.gradeData = firebase.firestore.FieldValue.serverTimestamp();
                        firebase
                            .firestore()
                            .collection("grades")
                            .doc(document.id)
                            .set(grade)
                            .catch(error => console.log(error));
                    }
                });

                if (foundCorrespondingDocument == false) {
                    firebase
                        .firestore()
                        .collection("grades")
                        .add({
                            commitmentId: grade.commitmentId,
                            commitment: grade.commitment,
                            userId: firebase.auth().currentUser.uid,
                            commitmentGrade: grade.commitmentGrade,
                            gradeDate: firebase.firestore.FieldValue.serverTimestamp()
                        })
                        .then(data => data.get())
                        .then(gradeData => createComplete(gradeData.data()))
                        .catch(error => console.log(error));
                }
            }
        });
}

export async function getGradesByCommitmentId(commitmentId, gradesFetched) {
    var grades = [];
    var data = await firebase
        .firestore()
        .collection("grades")
        .get();

    data.forEach(document => {
        let temp = document.data();
        if (commitmentId == temp.commitmentId) {
            const grade = {
                id: document.id,
                commitmentId: temp.commitmentId,
                userId: temp.userId,
                gradeDate: temp.gradeDate,
                commitmentGrade: temp.commitmentGrade,
                commitment: temp.commitment
            };
            grades.push(grade);
        }
    });
    gradesFetched(grades);
}
