import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './src/Screens/Home';
import Note from './src/Screens/Note';
import AjoutNote from './src/Screens/AjoutNote';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            title: "Acceuil",
          }}/>
        <Stack.Screen
          name="Note"
          component={Note}
          options={{
            title: "Note",
          }}/>
        <Stack.Screen
          name="AjoutNote"
          component={AjoutNote}
          options={{
            title: "Ajouter une note",
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
