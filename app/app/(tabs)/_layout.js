import { useAuth, useUser } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { Redirect, Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

import { palette } from "../styles/styles";

const apiHost = process.env.EXPO_PUBLIC_API_HOST;

export default function TabLayout() {
  const { isSignedIn, isLoaded, user } = useUser();
  const { getToken } = useAuth();
  const [profileCompleted, setProfileCompleted] = useState(-1); // -1: not loaded, 0: not completed, 1: completed

  useEffect(() => {
    setProfileCompleted(-1);
    async function checkProfile() {
      const url = `${apiHost}/profile`;
      try {
        const { data } = await axios.get(url, {
          headers: { Authorization: `Bearer ${await getToken()}` },
        });
        console.log(data);
        if (data.name && data.vehicleId && data.vehicleMake) {
          setProfileCompleted(1);
        } else {
          setProfileCompleted(0);
        }
      } catch (error) {
        console.log(error);
      }
      // do axios call to check if profile is completed
      // if completed, setProfileCompleted(1)
      // else setProfileCompleted(0)
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
    <Tabs
    // screenOptions={{
    //   // headerShown: false,
    //   tabBarActiveTintColor: palette.highlight,
    //   tabBarInactiveTintColor: palette.mediumBlue,
    //   tabBarStyle: {
    //     backgroundColor: palette.mediumBlue,
    //     borderTopWidth: 0,
    //   },
    // }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => {
            console.log("focused", focused);
            return (
              <FontAwesome
                name="home"
                size={24}
                color={focused ? "#f00" : "#103FEF"}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="appointment"
        options={{
          title: "Appointment",
          tabBarIcon: () => {
            return <FontAwesome name="car" size={24} color="#00072d" />;
          },
          tabBarActiveBackgroundColor: "#002244",
          tabBarInactiveBackgroundColor: "red",
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
