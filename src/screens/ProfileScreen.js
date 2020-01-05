import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Firebase } from '../config'

export default class ProfileScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: Firebase.auth().currentUser
		}
    }
    
	handleLogOut = () => {
        Firebase.auth()
          .signOut()
          .then(() => this.props.navigation.navigate('Home'))
          .catch(error => console.log(error))
    }
    
	componentDidMount() {
		const unsubscribe = Firebase.auth().onAuthStateChanged((signedIn) => {
			if (signedIn) {
			  this.setState({
				  user: signedIn
			  })
			}
		 });
		 console.log(this.state.user.email);
		 return unsubscribe();
	}

	render() {
		return(
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={() => this.props.navigation.navigate('Orders', { user: this.state.user.uid })}>
                    <Text style={[styles.buttonText]}>Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.handleLogOut}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
		)
	}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#F6820D',
        borderColor: '#F6820D',
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    }
});