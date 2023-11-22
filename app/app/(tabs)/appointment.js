import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Appointment() {
  return (
    <View>
      <Text>Book an Appointment</Text>
      <Link href="/">Home</Link>
      <Link href="/message">Messages</Link>

      <Link href="/history">History</Link>
    </View>
  );
}
