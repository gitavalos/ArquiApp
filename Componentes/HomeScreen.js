import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { Card, Divider } from 'react-native-elements'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Sistema de deteccion de fuego',
  };

  constructor(){
    super();
    this.state = {
      Temperatura : "0",
      Humedad : "0"
    };
  }

  componentDidMount(){ 
    const rootRef = firebase.database().ref().child('wachter');
    rootRef.limitToLast(1).on('child_added', data => {
         var temp = data.child('temp').val();
         //temp = temp.replace("\n","");
         var hum = data.child('hum').val();         
         this.setState({Temperatura : temp });
         this.setState({Humedad : hum });5
    });      
  }


  render() {
    return (
      <View style={{justifyContent: 'space-between'}}>
      <Card title="TEMPERATURA">
        <View style={{paddingBottom: 10}}>
        <Text>Temperatura Actual:</Text>
        <Text style={{textAlign: 'center'}}>{this.state.Temperatura} °C</Text>
        </View>
        <Button
          title="Ver Historial Temperatura"
          onPress={() => this.props.navigation.navigate('Temperatura')}
        />      
        </Card>
        <Card title ="HUMEDAD">
        <View style={{paddingBottom: 10}}>
        <Text>Humedad Actual:</Text>
        <Text style={{textAlign: 'center'}}>{this.state.Humedad} °</Text>
        </View>
        <Button
          title="Ver Historial Humedad"
          onPress={() => this.props.navigation.navigate('Humedad')}
        />              
      </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    width: 50, 
    height: 50, 
    backgroundColor: 'steelblue'
  },
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export default HomeScreen;