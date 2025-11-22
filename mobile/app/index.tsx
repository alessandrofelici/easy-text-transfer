import { Button } from "@react-navigation/elements";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { signIn, signUp } from "@/firebase/firestore";
import { useAuth } from "./authContext";


export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { setUserId } = useAuth();

  const handleSignIn = async () => {
    const res = await signIn(email, password);
    if (!res) {
      setErrorMsg('Invalid Credentials');
    }
    else {
      setUserId(res);
    }
  }

  const handleSignUp = async () => {
    const res = await signUp(email, password);
    if (!res) {
      setErrorMsg('Email or Password Invalid');
    }
    else {
      setUserId(res);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput onChangeText={setEmail} style={{width:200, height:25, backgroundColor:"white"}} />
      <TextInput onChangeText={setPassword} style={{marginTop: 10, width:200, height:25, backgroundColor:"white"}} />
      <Button onPressIn={handleSignIn}> Sign In </Button>
      <Button onPressIn={handleSignUp}> Sign Up </Button>
      <Text>{errorMsg}</Text>
    </View>
  );
}