import { useEffect, useRef, useState } from "react";
import { Alert, Dimensions, DimensionValue, Keyboard, Linking, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { TextInput, View } from "react-native";
import { saveText, loadText } from "../firebase/firestore";
import { Button } from "@react-navigation/elements";
import * as Notifications from 'expo-notifications';

export default function Index() {
  const [message, setMessage] = useState<string>("");
  const [color, setColor] = useState<string>("gray");
  
  const loaded = useRef(false);
  const saving = useRef(false);
  const typing = useRef(false);
  const activity = useRef(Date.now());
  const messageRef = useRef(message);

  if (!loaded.current) {
    loadText().then((text) => {
      setMessage(text);
      loaded.current = true;
      setColor("white");
    });
  }

  const handleTextChange = (message: string) => {
    activity.current = Date.now();
    typing.current = true;
    setMessage(message);
  };

  const handlePress = () => {
    // Check for link in text
    const urlPattern = /https:\/\/[^\s]+/;
    if (urlPattern.test(message)) {
      Linking.openURL(message)
    }
    else {
      Alert.alert(
        'No link found',
        'Please insert a valid url.',
        [{ text: 'OK' }]
      )
    }
  };
  
  const interval: number = 0.5;
  useEffect(() => {
    if (!typing.current) {
      return;
    }

    messageRef.current = message;
    if (!saving.current) {
      saving.current = true
      setTimeout(() => { 
        console.log('Saving message:', messageRef.current);
        saveText(messageRef.current);
        saving.current = false;
      }, interval*1000);
    }
  }, [message])

  setInterval(() => {
    if (Date.now() - activity.current > 5*1000 && typing.current) {
      typing.current = false;
      console.log("User inactive");
    }

    if (!saving.current && !typing.current) {
      loadText().then((newMessage) => {
        setMessage(newMessage);
      });
    }
  }, interval*1000)

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          value={message}
          onChangeText={handleTextChange}
          style={[styles.input, {backgroundColor: color}]}
          multiline={true}
          editable={loaded.current}
        />
        <Button
          style={styles.button}
          onPressIn={handlePress}
          >
          Follow Link
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}

const screenWidth: DimensionValue = Dimensions.get('screen').width;
const screenHeight: DimensionValue = Dimensions.get('screen').height;

const marginX: DimensionValue = screenWidth * 0.75;
const marginY: DimensionValue = screenHeight * 0.6;

const styles = StyleSheet.create({
  input: {
    width: marginX,
    height: marginY,
    borderWidth: 1,
    padding: 10,
    color: 'gray'
  },
  button: {
    marginTop: 15
  }
})
