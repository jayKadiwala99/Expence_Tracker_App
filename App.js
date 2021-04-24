import React,{useState} from 'react';
import { Text, View } from 'react-native';
import { enableScreens} from 'react-native-screens'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
const Stack = createNativeStackNavigator()
enableScreens();
import firebase from '@firebase/app'
import 'firebase/auth'
import { firebaseConfig } from './firebaseConfig/config'
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}
import Boarding from './screen/boarding'
import Signin from './screen/Signin'
import Signup from './screen/Signup'
import Home from './screen/Home'

export default function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [loaded, setLoaded] = useState(false)
  
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      setLoaded(true)
      setIsLoggedIn(false)
    } else {
      setLoaded(true)
      setIsLoggedIn(true)
    }
  })

  if (!loaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading ...</Text>
       </View>
    )
  }

  if (!isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Onboarding" options={{headerShown: false}} component={Boarding} />
          <Stack.Screen name="Signin" options={{headerShown: false}} component={Signin} />
          <Stack.Screen name="Signup" options={{headerShown: false}} component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{headerShown: false}} component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
      // <Home />
    )
  }
}
