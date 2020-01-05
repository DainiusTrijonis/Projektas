import React from 'react';
import { AsyncStorage, Button, Text, View, TextInput, ScrollView, KeyboardAvoidingView, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Firebase } from '../config';

class OptionScreen extends React.Component {

    constructor(props) {
      const { navigation } = props;

      super()
      this.state = {
        isLoading: true,
        user: navigation.getParam('user', 'user'),
        categoryID: navigation.getParam('id', 'id'),
        optionID: navigation.getParam('optionID', 'optionID'),
        title: navigation.getParam('title', 'title'),
        image: navigation.getParam('image', 'image'),
        comments: "",
        description: "",
        url: 'https://api.myjson.com/bins/1gih70',
        TextInputValue: '',
        NameInputValue: '',
      }
  
    }

    async componentDidMount() {
      // GET CONTENT FROM FIRESTORE //
      await Firebase.firestore()
        .collection("categories")
        .doc(this.state.categoryID)
        .collection("options")
        .doc(this.state.optionID)
        .get().then((doc) => {
          if (doc.exists) {
            this.setState({
              isLoading: false,
              description: doc.data().description,
            })
          }
        });
    }

    handleOrder() {
      // Add a new document in collection "cities"
      console.log(this.state.user.uid);
      Firebase.firestore()
        .collection("orders")
        .doc(this.state.user.uid)
        .collection("orders")
        .doc()
        .set({
          user: this.state.user.email,
          order: this.state.title,
          status: "Ordered"
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
      }
    
    loadComments = async () => {
        await AsyncStorage.getItem(this.state.title, (err, comment) => this.setState({comments: comment})).catch(err => {alert.message(err.message)});
    }
  
    buttonClickListener = () => {
      comments = this.state.comments;
      let name = this.state.NameInputValue;
      let comment = this.state.TextInputValue;
  
      if (comments !== null) {
        comments += '\n';
        name = name === '' ? "Anonimas: " : name + ": ";
        comments += name + comment;
      } else {
        name = name === '' ? "Anonimas: " : name + ": ";
        comments = name + comment;
      }
  
      AsyncStorage.setItem(this.state.title, comments);
      this.setState({
        comments: comments,
        TextInputValue: '',
        NameInputValue: '',
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

      let button;
      if (this.state.user != null) {
        button = (
          <Button
          title='Užsakyti'
          color='yellow'
          onPress={() => this.handleOrder()}
          />
        )
      }

      return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled keyboardVerticalOffset={80}>
          <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
  
            {/*             HEADER             */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}> { this.state.title } </Text>
            </View>

            <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ width: 350, height: 200 }} source={{ uri: this.state.image }} />
            </View>

            <View style={{ flex: 5, flexDirection: 'row' }}>

              {/*             DESCRIPTION             */}
              <View style={{ flex: 1 }}>

                <Text style={styles.subtitleText}>APRAŠYMAS:</Text>
                <Text style={styles.ingredientText}>{ this.state.description }</Text>

              </View>

            </View>

            {/*             COMMENT HEADER             */}
            <View style={{ flex: 1 }}>
              <Text style={ styles.titleText }>Komentarai:</Text>
            </View>
  
            {/*             COMMENTS             */}
            <View style={{ flex: 1 }}>
              <Text>
                { this.state.comments }
              </Text>
            </View>
  
            {/*             COMMENT INPUT             */}
            <View style={{ flex: 1 }}>

            <TextInput
              style={{ height: 45 }}
              placeholder='Jūsų vardas'
              multiline={false}
              onChangeText={NameInputValue => this.setState({NameInputValue})}
              value={this.state.NameInputValue}
              />

              <TextInput
              style={{ height: 50 }}
              placeholder='Rašyti komentarą...'
              multiline={true}
              onChangeText={TextInputValue => this.setState({TextInputValue})}
              value={this.state.TextInputValue}
              />

              <Button
              title='Komentuoti'
              color='green'
              onPress={this.buttonClickListener}
              />
              
              { button }

            </View>
  
          </ScrollView>
        </KeyboardAvoidingView>
      );
    }
}

export default OptionScreen;

const styles = StyleSheet.create({
    titleText: {
        fontWeight: 'bold',
        fontSize: 24,
      },
    
      subtitleText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 50,
      },

      ingredientText: {
        fontSize: 16,
        marginBottom: 10,
      },

});
