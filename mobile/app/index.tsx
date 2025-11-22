import { Button } from "@react-navigation/elements";
import { useState } from "react";
import { TextInput, View } from "react-native";


export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    
  }

  const handleSignUp = async () => {

  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput onChangeText={setEmail} />
      <TextInput onChangeText={setPassword} />
      <Button onPressIn={handleSignIn}> Sign In </Button>
      <Button onPressIn={handleSignUp}> Sign Up </Button>
    </View>
  );
}