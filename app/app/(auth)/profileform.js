import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { Redirect, router } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

import { baseStyles, palette } from "../styles/styles";

const apiHost = process.env.EXPO_PUBLIC_API_HOST;

export default function ProfileForm() {
  const { getToken, signOut } = useAuth();
  const [profileData, setProfileData] = useState({
    name: "",
    carmodel: "",
    carnumber: "",
  });
  const { user } = useUser();
  if (!user) {
    return <Redirect href="/login" />;
  }

  function handleChange(element, value) {
    setProfileData((prev) => {
      return {
        ...prev,
        [element]: value,
      };
    });
  }

  async function handleSubmit() {
    const url = `${apiHost}/profile`;
    const dataToSend = {
      name: profileData.name,
      vehicleId: profileData.carnumber,
      vehicleMake: profileData.carmodel,
    };
    console.log(dataToSend);
    // do axios call to save profile
    // if successful, redirect to home page
    try {
      await axios.patch(url, dataToSend, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      router.replace("/");
    } catch (error) {
      Alert.alert("Something went wrong", error.message);
    }
  }

  return (
    <View style={[baseStyles.container]}>
      <Text>User ID</Text>
      <Text>{user.id}</Text>
      <View style={[baseStyles.formGroup]}>
        <Text style={[baseStyles.label]}>Full name</Text>
        <TextInput
          selectionColor={palette.white}
          style={[baseStyles.input]}
          onChangeText={(value) => handleChange("name", value)}
          value={profileData.name}
        />
      </View>
      <View style={[baseStyles.formGroup]}>
        <Text style={[baseStyles.label]}>Model of the car</Text>
        <TextInput
          selectionColor={palette.white}
          style={[baseStyles.input]}
          onChangeText={(value) => handleChange("carmodel", value)}
          value={profileData.carmodel}
        />
      </View>
      <View style={[baseStyles.formGroup]}>
        <Text style={[baseStyles.label]}>Car registration number</Text>
        <TextInput
          selectionColor={palette.white}
          style={[baseStyles.input]}
          onChangeText={(value) => handleChange("carnumber", value)}
          value={profileData.carnumber}
        />
      </View>

      <Pressable
        style={({ pressed }) => {
          return {
            ...baseStyles.button,
            marginTop: 10,
            borderColor: pressed ? palette.white : palette.mediumBlue,
            backgroundColor: "steelblue",
          };
        }}
        onPress={handleSubmit}
      >
        <Text style={{ color: "white" }}>Save profile</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => {
          return {
            ...baseStyles.button,
            marginTop: 10,
            borderColor: pressed ? palette.white : palette.mediumBlue,
            backgroundColor: "steelblue",
          };
        }}
        onPress={() => {
          signOut();
        }}
      >
        <Text style={{ color: "white" }}>Signout</Text>
      </Pressable>
    </View>
  );
}
