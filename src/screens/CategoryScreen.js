import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet, ActivityIndicator, ImageBackground, ScrollView } from 'react-native';
import { Firebase } from '../config';

class CategoryScreen extends React.Component {
    constructor(props) {
      const { navigation } = props;
  
      super();
      this.state = {
        isLoading: true,
        user: navigation.getParam('user', 'user'),
        categoryID: navigation.getParam('id', 'id'),
        category: navigation.getParam('category', 'category'),
        bannerImage: navigation.getParam('bannerImage', 'bannerImage'),
        options: null,
        url: 'https://api.myjson.com/bins/jejh0',
      };
    }

    async componentDidMount() {
      // GET OPTIONS FROM FIRESTORE //
      await Firebase.firestore()
        .collection("categories/" + this.state.categoryID + "/options").get().then((querySnapshot) => {
          const options = [];

          querySnapshot.forEach((option) => {
              options.push({
                id: option.id,
                title: option.data().title,
                image: option.data().image,
              });
          });

          this.setState({
            isLoading: false,
            options: options,
          });
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

      let options = this.state.options.map((val, key) => {
        return  <TouchableHighlight
                key={key}
                style={ styles.button }
                onPress={() => this.props.navigation.navigate('Options', { user: this.state.user, id: this.state.categoryID, optionID: val.id, title: val.title, image: val.image } )}
                >
                    <ImageBackground style={{ width: '100%', height: '100%', justifyContent: 'flex-end' }} source={{ uri: val.image }}>
                        <Text style={ styles.buttonText } > { val.title } </Text>
                    </ImageBackground>
                </TouchableHighlight>
    });

      return (
        <View style={{ flex: 1 }}>
  
          {/*             HEADER             */}
          <ImageBackground style={{ flex: 2, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }} source={{ uri: this.state.bannerImage }}>
              <Text style={ styles.titleText }> { this.state.category } </Text>
          </ImageBackground>
  
          {/*             OPTIONS             */}
          <View style={{ flex: 14, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
              <ScrollView>

                { options }

              </ScrollView>
          </View>
  
        </View>
      )
    }
}

export default CategoryScreen;

const styles = StyleSheet.create({
    button: {
        width: 240,
        height: 240,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
      },

      titleText: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
      },

      buttonText: {
        backgroundColor: 'rgba(128, 128, 128, 0.4)',
        height: 50,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 18,
      },
});
