import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View>
      <Text>This is the Home Page</Text>
      <Link href="/appointment">Book an Appointment</Link>
      <Link href="/history">Service History</Link>
      <Link href="/message">Messages</Link>
    </View>
  );
}
