import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function History() {
  return (
    <View>
      <Text>Service History and reviews</Text>
      <Link href="/">Home</Link>
      <Link href="/message">Messages</Link>

      <Link href="/appointment">Book an Appointment</Link>
    </View>
  );
}
