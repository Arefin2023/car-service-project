import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";
import dayjs from "dayjs";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import StarRating from "react-native-star-rating-widget";

const apiHost = process.env.EXPO_PUBLIC_API_HOST;

export default function History() {
  const [serviceData, setServiceData] = useState([]);
  const { getToken } = useAuth();
  const [rating, setRating] = useState(0);

  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        const url = `${apiHost}/profile/appointments`;
        try {
          const { data } = await axios.get(url, {
            headers: { Authorization: `Bearer ${await getToken()}` },
          });
          // console.log(data);
          setServiceData(data);
          console.log("history");
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
      loadData();
    }, [])
  );

  return (
    <View>
      <Text>Service History and reviews</Text>
      <View>
        {serviceData.length > 0
          ? serviceData.map((item) => {
              return (
                <Text key={item.id}>
                  {dayjs(item.startTime).format("DD.MM.YYYY")}
                  {item.service}
                  <StarRating rating={rating} onChange={setRating} />
                </Text>
              );
            })
          : null}
      </View>
      <Link href="/">Home</Link>
      <Link href="/message">Messages</Link>

      <Link href="/appointment">Book an Appointment</Link>
    </View>
  );
}
