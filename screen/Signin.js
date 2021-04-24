import React,{useState} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import firebase from '@firebase/app'
import 'firebase/auth'
import 'firebase/firestore';

const Signin = ({ navigation }) => {
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = async ({navigation}) => {
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 28,fontWeight: 'bold',color: '#222',marginBottom: 5}}>Log In Now</Text>
            <Text style={{ fontSize: 14, color: '#a6a6a6',marginBottom: 50 }}>Please login to track your expenses</Text>
            <TextInput onChangeText={(value)=>setEmail(value)} style={{width: 300,height: 50,borderWidth: 1,borderColor: '#999',borderRadius: 4,padding: 5,paddingLeft: 15}} placeholder="Email" />
            <TextInput onChangeText={(value)=>setPassword(value)} secureTextEntry={true} style={{marginTop: 20,width: 300,height: 50,borderWidth: 1,borderColor: '#999',borderRadius: 4,padding: 5,paddingLeft: 15}} placeholder="Password" />
            <View style={{width: 300,alignItems: 'flex-end',justifyContent: 'center',marginTop: 25}}>
                <Text style={{color: '#555'}}>Forgot password?</Text>
            </View>
            <TouchableOpacity onPress={login} style={{ width: 300, height: 50,alignItems: 'center',justifyContent: 'center', backgroundColor: '#f26866', marginTop: 20, borderRadius: 4 }}>
                <Text style={{color: '#fff',fontSize: 16}}>Log In</Text>
            </TouchableOpacity>
            <View style={{width: 300,alignItems: 'center',justifyContent: 'center',marginTop: 25}}>
                <Text style={{color: '#555'}}>Don't have an account? <Text style={{color: '#f26866'}} onPress={()=>navigation.replace('Signup')}>Sign Up</Text></Text>
            </View>
        </View>
    )
}

export default Signin

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});