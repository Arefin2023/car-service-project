import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
export default function TabLayout() {
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
