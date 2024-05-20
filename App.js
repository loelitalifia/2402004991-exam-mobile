import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import User from './App/Screens/User';
import Maps from './App/Screens/MapScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="User"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#e5e1e0',
          },
          contentStyle: styles.container,
        }}
      >
        <Stack.Screen
          name="User"
          component={User}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Maps" component={Maps} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e1e0',
    paddingTop: '10%',
    paddingBottom: '30%',
  },
});
