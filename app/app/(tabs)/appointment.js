import { Link } from "expo-router";
import { Text, View } from "react-native";

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
