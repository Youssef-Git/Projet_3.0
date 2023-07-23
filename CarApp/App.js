import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Api from './components/Api';
import Book from './components/Book';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Api" component={Api} />
      <Stack.Screen name="Book" component={Book} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;