import { useState } from "react";
import { Dimensions, DimensionValue, StyleSheet } from "react-native";
import { TextInput, View } from "react-native";
import { saveText, loadText } from "../firebase/firestore"

export default function Index() {
  const [message, setMessage] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);
  
  let saving: boolean = false;
  const interval: number = 0.5;
  const saveMessage = (text: string) => {
    setMessage(text);
    if (!saving) {
      saving = true;
      setTimeout(() => {
        saveText(message);
        saving = false;
      }, interval*1000)
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput
        value={message}
        onChangeText={saveMessage}
        style={styles.input}
        multiline={true}
        editable={loaded}
      />
    </View>
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
  }
})
