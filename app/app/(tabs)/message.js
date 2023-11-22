import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Messages() {
  return (
    <View>
      <Text>Messages from the service center</Text>
      <Link href="/">Home</Link>
      <Link href="/appointment">Book an Appointment</Link>

      <Link href="/history">History</Link>
    </View>
  );
}
