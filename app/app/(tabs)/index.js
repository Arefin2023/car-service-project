import { useUser, useAuth } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { Text, View, Pressable } from "react-native";

import { baseStyles, palette } from "../styles/styles";

export default function Home() {
  const { signOut } = useAuth();
  const { user } = useUser();
  console.log(user);
  return (
    <View style={baseStyles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text
          style={[baseStyles.text, { paddingBottom: 12, textAlign: "center" }]}
        >
          Welcome to our car servicing app.
        </Text>
        <Text
          style={[baseStyles.text, { paddingBottom: 12, textAlign: "center" }]}
        >
          You are logged in as:
        </Text>
        <Text
          style={[
            baseStyles.text,
            {
              paddingBottom: 12,
              textAlign: "center",
              color: palette.highlight,
            },
          ]}
        >
          {user.primaryEmailAddress.emailAddress}
        </Text>
        <Text style={[baseStyles.text, { textAlign: "center" }]}>
          Here you can book an appointment for servicing your car in just a few
          steps
        </Text>
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
            router.push("/appointment");
          }}
        >
          <Text style={[baseStyles.text]}>Book Appointment</Text>
        </Pressable>
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
