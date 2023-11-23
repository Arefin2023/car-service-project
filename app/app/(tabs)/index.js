import { useUser, useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View, Pressable } from "react-native";

import { baseStyles, palette } from "../styles/styles";

export default function Home() {
  const { signOut } = useAuth();
  const { user } = useUser();
  console.log(user);
  return (
    <View>
      <View>
        <Text>This is the Home Page</Text>
        <Link href="/appointment">Book an Appointment</Link>
        <Link href="/history">Service History</Link>
        <Link href="/message">Messages</Link>
      </View>
      <View>
        <Pressable
          style={({ pressed }) => {
            return {
              ...baseStyles.button,
              marginTop: 10,
              backgroundColor: pressed ? palette.mediumBlue : palette.darkBlue,
            };
          }}
          onPress={() => {
            signOut();
          }}
        >
          <Text style={[baseStyles.text]}>Log out</Text>
        </Pressable>
      </View>
    </View>
  );
}
