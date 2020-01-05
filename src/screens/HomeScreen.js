import React from 'react';
import { AsyncStorage, TouchableHighlight, Button, Text, View, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
import { Firebase } from '../config';

class HomeScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        categories: null,
        header: 'Kategorijos',
        user: null,
        buttonText: '',
      }
    }

    async componentDidMount() {
      // GET CATEGORIES FROM FIRESTORE //
      Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({
            buttonText: "Profile",
            user: user
          });
        } else {
          this.setState({
            buttonText: "Login",
            user: null,
          })
        }
      });

      await Firebase.firestore()
        .collection("categories").get().then((querySnapshot) => {
          const categories = [];

          querySnapshot.forEach((category) => {
              categories.push({
                id: category.id,
                title: category.data().title,
                image: category.data().image,
              });
          });

          this.setState({
            isLoading: false,
            categories: categories,
          });
        });
    }
  
    // NAVIGATES TO LOGIN OR PROFILE DEPENDING IF THE USER IS LOGGED IN OR NOT //
    handleAuthentication() {
      let authFlag = true;
      Firebase.auth().onAuthStateChanged((user) => {
        if (user && authFlag) {
          this.props.navigation.navigate('Profile');
          authFlag = false;
        } else if (!user & authFlag) {
          this.props.navigation.navigate('Login');
          authFlag = false;
        }
      });
    }
  
    render() {
      if (this.state.isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator/>
          </View>
        )
      }
  
      let categories = this.state.categories.map((val, key) => {
        return <TouchableHighlight
                key={key}
                style={ styles.button }
                onPress={() => this.props.navigation.navigate('Categories', { user: this.state.user, id: val.id, category: val.title, bannerImage: val.image } )}
                >
                <ImageBackground style={{ width: '100%', height: '100%', justifyContent: 'flex-end' }} source={{ uri: val.image }}>
                    <Text style={ styles.titleText }> { val.title } </Text>
                </ImageBackground>
              </TouchableHighlight>
      });
  
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          
          {/*             HEADER             */}
            <ImageBackground style={{ flex: 3, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }} source={ require('./../../assets/homeBanner.png') }>
                <Text style={ styles.headerText }> { this.state.header } </Text>
            </ImageBackground>
          
          {/*             CATEGORIES             */}
          <View style={{ flex: 16, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap' }}>
            { categories }
          </View>

          {/*             LOGIN             */}
          <View style={{ flex: 2 }}>
            <Button
            title={this.state.buttonText}
            onPress={() => this.handleAuthentication()}
            />
          </View>
  
        </View>
      );
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    button: {
        width: 175,
        height: 175,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 1,
      },

      headerText: {
        fontWeight: 'normal',
        fontSize: 26,
        textAlign: 'center',
        color: 'white',
      },

      titleText: {
        backgroundColor: 'rgba(128, 128, 128, 0.4)',
        height: 30,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      },
});
