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
        <Text>
          Welcome {user.primaryEmailAddress.emailAddress} to our car servicing
          app
        </Text>
        <Text>
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
            signOut();
          }}
        >
          <Text style={[baseStyles.text]}>Log out</Text>
        </Pressable>
      </View>
    </View>
  );
}
