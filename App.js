import { StyleSheet, Text, View,SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TasksScreen from './screens/TasksScreen';
import MessagesScreen from './screens/MessagesScreen';
import LastActivityScreen from './screens/LastActivityScreen';


const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <StatusBar style={styles.statusBar}/>
            <Tab.Navigator
              initialRouteName='Messages'
              screenOptions={{ tabBarIndicatorStyle: { backgroundColor: "blue" } }}
            >
            <Tab.Screen name="Messages" component={MessagesScreen} />
            <Tab.Screen name="Tasks" component={TasksScreen} />
            <Tab.Screen name="Last Activities" component={LastActivityScreen} />
          </Tab.Navigator>
      </NavigationContainer>  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBar: {
    barStyle: "dark-content",
    backgroundColor: "#000",
  }
});
