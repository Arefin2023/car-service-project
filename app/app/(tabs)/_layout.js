import { Tabs } from "expo-router";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { palette } from "../../styles/styles";
export default function TabLayout() {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) {
    return <View style={{ flex: 1, backgroundColor: palette.darkBlue }}></View>;
  }
  if (!isSignedIn) {
    return <Redirect href="/login" />;
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
