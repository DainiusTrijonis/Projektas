import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
import { Firebase } from '../config';
import { ScrollView } from 'react-native-gesture-handler';

class OrdersScreen extends React.Component {

    constructor(props) {
      const { navigation } = props;

      super(props);
      this.state = {
        isLoading: true,
        orders: null,
        header: 'Your Orders',
        user: navigation.getParam('user', 'user'),
      }
    }

    componentDidMount() {
      // Get orders from firestore
      Firebase.firestore()
        .collection("orders")
        .doc(this.state.user)
        .collection("orders")
        .onSnapshot(snapshot => {
          const orders = [];

          snapshot.docs.forEach(order => {
            orders.push({
              order: order.data().order,
              status: order.data().status,
            });

            this.setState({
              isLoading: false,
              orders: orders,
            });
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
  
      let orders = this.state.orders.map((val, key) => {
        return <View
                key={key}
                style={{ flex: 1, margin: 10, flexDirection: 'row' }}
                >
                  <Text style={{ paddingRight: 50, fontSize: 18, fontWeight: 'bold' }}>Order: { val.order }</Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Status: { val.status }</Text>
              </View>
      });
  
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          
          {/*             HEADER             */}
            <ImageBackground style={{ flex: 3, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }} source={ require('./../../assets/homeBanner.png') }>
                <Text style={ styles.headerText }> { this.state.header } </Text>
            </ImageBackground>
          
          {/*             ORDERS             */}
          <View style={{ flex: 16, flexDirection: 'column', justifyContent: 'center', alignContent: 'center' , flexWrap: 'wrap'}}>
            <ScrollView>
  
              { orders }

            </ScrollView>
          </View>
  
        </View>
      );
    }
}

export default OrdersScreen;

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
