import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { baseStyles, palette } from "../styles/styles";
import { useUser } from "@clerk/clerk-react";
import { Redirect, router } from "expo-router";

export default function ProfileForm() {
  const { user } = useUser();
  if (!user) {
    return <Redirect href="/login" />;
  }

  async function handleSubmit() {
    // do axios call to save profile
    // if successful, redirect to home page
    router.replace("/");
  }

  return (
    <View style={[baseStyles.container]}>
      <Text>User ID</Text>
      <Text>{user.id}</Text>

      <Pressable onPress={handleSubmit}>
        <Text>Save profile</Text>
      </Pressable>
    </View>
  );
}
