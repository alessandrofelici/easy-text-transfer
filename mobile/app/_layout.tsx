import { Stack } from "expo-router";

let isLoggedIn = false;

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="index" />
      </Stack.Protected>

      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="private" />
      </Stack.Protected>
    </Stack>
  );
}
