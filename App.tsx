/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Booking1 from './Booking1';
import Booking2 from './Booking2';
import {StoreProvider} from './store/store';
import HomeIcon from './assets/Home.svg';
import BookingIcon from './assets/BookingIcon.svg';

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, tabBarActiveTintColor: 'purple'}}>
        
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => <HomeIcon height="30" />,
        }}
        name="Book Flights"
        component={Booking1}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => <BookingIcon height="30" />,
        }}
        name="Your Bookings"
        component={Booking2}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
