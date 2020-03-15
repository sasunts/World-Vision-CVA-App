import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    fontSize: 22,
    color: "black",
    paddingLeft: 10
  },
  contentHeading: {
    fontWeight: "bold",
    fontSize: 16
  },
  content: {
    marginTop: 10,
    fontSize: 19
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20
  },
  defButtonContainer: {
    backgroundColor: "#A9A9A9",
    padding: 15,
    borderRadius: 8,
    margin: 5
  },
  containerLogin: {
    paddingTop: "50%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  email_Password: {
    flex: 3,
    width: "80%"
  },
  container: {
    paddingTop: 10
  },
  homeContainer: {
    flex: 1,
    paddingTop: "30%",
    padding: 20
  },
  modalContainer: {
    flex: 1,
    paddingTop: "15%",
    padding: 20
  },
  input: {
    borderWidth: 0.2,
    height: 50,
    paddingLeft: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 15,
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  errorText: {
    fontSize: 20,
    color: "red",
    alignSelf: "center",
    marginTop: 10
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20
  },
  buttonContainer: {
    backgroundColor: "#ff7800",
    padding: 15,
    borderRadius: 8,
    margin: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  commitmentHomeViewContainer: {
    backgroundColor: "#FFFFFF"
  },
  commitmentOverviewContainer: {
    backgroundColor: "#82ddfa",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    marginTop: 5
  },
  addButton: {
    width: 50,
    height: 50,
    margin: 20,
    borderWidth: 2,
    borderColor: "#ff7800",
    borderRadius: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  addButtonText: {
    fontWeight: "bold",
    color: "#ff7800",
    textAlignVertical: "center",
    fontSize: 20
  },
  standardsTableOuterContainer: {
    backgroundColor: "#898989",
    margin: 5
  },
  standardsTableInnerContainer: {
    backgroundColor: "#A9A9A9",
    margin: 5
  },
  inputCommitmentTitle: {
    height: 40,
    paddingTop: 5,
    paddingLeft: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 20,
    textAlign: "left",
    textAlignVertical: "top",
    backgroundColor: "#fff"
  },
  inputCommitmentDescription: {
    height: 80,
    paddingTop: 5,
    paddingLeft: 10,
    marginBottom: 15,
    paddingTop: 10,
    borderRadius: 5,
    fontSize: 15,
    textAlign: "left",
    textAlignVertical: "top",
    backgroundColor: "#fff"
  },
  inputCommitmentInputs: {
    flex: 1,
    height: 40,
    paddingTop: 5,
    paddingLeft: 10,
    borderRadius: 5,
    marginRight: 5,
    marginVertical: 5,
    fontSize: 15,
    textAlign: "left",
    textAlignVertical: "top",
    backgroundColor: "#fff"
  },
  inputsContainer: {
    flex: 0,
    flexDirection: "row",
    alignContent: "space-around"
  },
  addInputButton: {
    width: 30,
    height: 30,
    margin: 20,
    borderRadius: 10,
    fontSize: 20,
    alignSelf: "center",
    alignItems: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    backgroundColor: "#A9A9A9"
  },
  removeInputButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    fontSize: 20,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#A9A9A9"
  },
  veryGoodButtonContainer: {
    marginTop: 50,
    backgroundColor: "#008000",
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    margin: 5
  },
  goodButtonContainer: {
    backgroundColor: "#96c11f",
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    margin: 5
  },
  averageButtonContainer: {
    backgroundColor: "#ffa500",
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    margin: 5
  },
  badButtonContainer: {
    backgroundColor: "#ff0000",
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    margin: 5
  },
  veryBadButtonContainer: {
    backgroundColor: "#800000",
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    margin: 5
  },
  gradeButtonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16
  },
  modalGradeBox: {
    paddingTop: "10%"
  },
  wrapper: { flexDirection: "row" },

  tableContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 10
    // backgroundColor: "#fff"
  },
  tableHead: { height: 40, backgroundColor: "#f1f8ff" },
  tableText: { margin: 6, textAlign: "center" }
});

export default styles;
