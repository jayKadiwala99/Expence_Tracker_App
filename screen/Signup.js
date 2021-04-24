import React, {useState} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import firebase from '@firebase/app'
import 'firebase/auth'
import 'firebase/firestore';

const Signup = ({navigation}) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const signUp = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("user").doc(firebase.auth().currentUser.uid).set({name,email})
            })
            .catch((error) => {
                console.log(error)
        })
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 28,fontWeight: 'bold',color: '#222',marginBottom: 5}}>Sign Up Now</Text>
            <Text style={{ fontSize: 14, color: '#a6a6a6',marginBottom: 50 }}>Please signup to track your expenses</Text>
            <TextInput onChangeText={(value)=>setName(value)} style={{width: 300,height: 50,borderWidth: 1,borderColor: '#999',borderRadius: 4,padding: 5,paddingLeft: 15}} placeholder="Name" />
            <TextInput onChangeText={(value)=>setEmail(value)} style={{marginTop: 20,width: 300,height: 50,borderWidth: 1,borderColor: '#999',borderRadius: 4,padding: 5,paddingLeft: 15}} placeholder="Email" />
            <TextInput onChangeText={(value)=>setPassword(value)} secureTextEntry={true} style={{marginTop: 20,width: 300,height: 50,borderWidth: 1,borderColor: '#999',borderRadius: 4,padding: 5,paddingLeft: 15}} placeholder="Password" />
            <TouchableOpacity onPress={signUp} style={{ width: 300, height: 50,alignItems: 'center',justifyContent: 'center', backgroundColor: '#f26866', marginTop: 30, borderRadius: 4 }}>
                <Text style={{color: '#fff',fontSize: 16}}>Create Account</Text>
            </TouchableOpacity>
            <View style={{width: 300,alignItems: 'center',justifyContent: 'center',marginTop: 25}}>
                <Text style={{color: '#555'}}>Already have an account? <Text style={{color: '#f26866'}} onPress={()=>navigation.replace('Signin')}>Log In</Text></Text>
            </View>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});