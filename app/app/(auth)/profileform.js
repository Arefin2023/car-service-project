import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { Redirect, router } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable, TextInput, Alert } from "react-native";

import { baseStyles, palette } from "../styles/styles";

export default function ProfileForm() {
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
    const url = "http://192.168.178.51:3000/customers";
    const dataToSend = {
      email: user.primaryEmailAddress.emailAddress,
      name: profileData.name,
      cars: [
        {
          model: profileData.carmodel,
          vehicleId: profileData.carnumber,
        },
      ],
    };
    console.log(dataToSend);
    // do axios call to save profile
    // if successful, redirect to home page
    try {
      await axios.post(url, dataToSend);
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
    </View>
  );
}
