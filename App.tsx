/* eslint-disable react-native/no-inline-styles */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AnimatedAPIScreens from './screens/animatedAPIScreen';
import HomeScreen from './screens/homeScreen';
import ScrollAnimated from './screens/scrollAnimated';
import GestureHandler from './screens/gestureHandler';
import PanResponderComponent from './screens/PanResponder';


type RootStackParamList = {
  Home: undefined;
  Animated: undefined;
  ScrollAnimated: undefined;
  Gesture: undefined;
  PanResponder : undefined;
};


/**
 * Linking Configuration
 */
/**
 * Linking Configuration
 */
const linking = {
  // Prefixes accepted by the navigation container, should match the added schemes
  prefixes: ["myapp://"],
  // Route config to map uri paths to screens
  config: {
    // Initial route name to be added to the stack before any further navigation,
    // should match one of the available screens
    initialRouteName: "Home" as const,
    screens: {
      // myapp://home -> HomeScreen
      Home: "home",
      ScrollAnimated : "scroll",
      PanResponder : "pan"
    },
  },
};


const Stack = createNativeStackNavigator<RootStackParamList>();
const App = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="Animated"
          component={AnimatedAPIScreens}
          options={{ title: 'Animated APIs' }}
        />
        <Stack.Screen
          name="ScrollAnimated"
          component={ScrollAnimated}
          options={{ title: 'Scroll Animated' }}
        />
        <Stack.Screen
          name="Gesture"
          component={GestureHandler}
          options={{ title: 'Gesture Handler' }}
        />
        <Stack.Screen
          name="PanResponder"
          component={PanResponderComponent}
          options={{ title: 'Pan Responder' }}
        />
      </Stack.Navigator>
    </NavigationContainer >
  );
};

export default App;