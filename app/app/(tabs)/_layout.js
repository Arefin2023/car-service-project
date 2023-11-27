import { useUser } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs, Redirect } from "expo-router";
import { View } from "react-native";

import { palette } from "../styles/styles";
import { useEffect, useState } from "react";
export default function TabLayout() {
  const { isSignedIn, isLoaded, user } = useUser();
  const [profileCompleted, setProfileCompleted] = useState(-1); // -1: not loaded, 0: not completed, 1: completed

  useEffect(() => {
    setProfileCompleted(-1);
    async function checkProfile() {
      // do axios call to check if profile is completed
      // if completed, setProfileCompleted(1)
      // else setProfileCompleted(0)
      setProfileCompleted(0);
    }
    if (user?.id) {
      checkProfile();
    }
  }, [user]);

  if (!isLoaded) {
    console.log("loading", isLoaded, profileCompleted);
    return <View style={{ flex: 1, backgroundColor: palette.darkBlue }} />;
  }
  if (!isSignedIn) {
    return <Redirect href="/login" />;
  }
  if (profileCompleted === -1) {
    console.log("loading", isLoaded, profileCompleted);
    return <View style={{ flex: 1, backgroundColor: palette.darkBlue }} />;
  }
  if (profileCompleted < 1) {
    return <Redirect href="/profileform" />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => {
            return <FontAwesome name="home" size={24} color="blue" />;
          },
        }}
      />
      <Tabs.Screen
        name="appointment"
        options={{
          title: "Appointment",
          tabBarIcon: () => {
            return <FontAwesome name="car" size={24} color="green" />;
          },
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: () => {
            return <FontAwesome name="folder" size={24} color="orange" />;
          },
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: "Messages",
          tabBarIcon: () => {
            return <FontAwesome name="envelope" size={24} color="lightblue" />;
          },
        }}
      />
    </Tabs>
  );
}
