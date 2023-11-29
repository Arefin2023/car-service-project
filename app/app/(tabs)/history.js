import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";
import { Link } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

const apiHost = process.env.EXPO_PUBLIC_API_HOST;

export default function History() {
  const { getToken } = useAuth();

  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        const url = `${apiHost}/profile/appointments`;
        try {
          const { data } = await axios.get(url, {
            headers: { Authorization: `Bearer ${await getToken()}` },
          });
          // console.log(data);
          console.log("history");
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
      loadData();
    }, [])
  );

  // useEffect(() => {
  //   async function loadData() {
  //     const url = `${apiHost}/profile/appointments`;
  //     try {
  //       const { data } = await axios.get(url, {
  //         headers: { Authorization: `Bearer ${await getToken()}` },
  //       });
  //       // console.log(data);
  //       console.log("history");
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   loadData();
  // }, []);

  return (
    <View>
      <Text>Service History and reviews</Text>
      <Link href="/">Home</Link>
      <Link href="/message">Messages</Link>

      <Link href="/appointment">Book an Appointment</Link>
    </View>
  );
}
