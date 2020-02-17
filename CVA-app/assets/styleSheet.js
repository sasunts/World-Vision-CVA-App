import { StyleSheet } from 'react-native';
import CommimentOverview from '../components/GovtCommitments/CommitmentOverview';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
    heading: {
        fontSize: 22,
        color: 'black',
        marginBottom: 10
    },
    content: {
        marginTop: 10,
        fontSize: 19,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    buttonContainer: {
        backgroundColor: '#3B3B98',
        padding: 15,
        borderRadius: 8
    },
    containerLogin: {
        paddingTop: "50%",
        flex: 1,
        justifyContent: 'center',
    },
    email_Password: {
        flex: 2
    },
    container: {
        flex: 1,
        padding: 20
    },
    input: {
        height: 40,
        paddingLeft: 10,
        marginBottom: 15,
        borderRadius: 5,
        fontSize: 15,
        backgroundColor: '#fff'
    },
    errorText: {
        fontSize: 20,
        color: 'red',
        alignSelf: 'center',
        marginTop: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    buttonContainer: {
        backgroundColor: '#3B3B98',
        padding: 15,
        borderRadius: 8
    },
    commitmentHomeViewContainer: {
        backgroundColor: '#FFFFFF',
    },
    commitmentOverviewContainer: {
        backgroundColor: '#5F3B98',
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 5,
        marginTop: 5
    }
});


export default styles;