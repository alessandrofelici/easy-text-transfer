import { useState } from "react";
import { Dimensions, DimensionValue, StyleSheet } from "react-native";
import { TextInput, View } from "react-native";

export default function Index() {
  const [message, setMessage] = useState<string>("");

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
        onChangeText={setMessage}
        style={styles.input}
        multiline={true}
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
