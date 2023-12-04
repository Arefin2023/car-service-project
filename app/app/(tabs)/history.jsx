import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";
import dayjs from "dayjs";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";

import Card from "../components/Card";
import { baseStyles } from "../styles/styles";

const apiHost = process.env.EXPO_PUBLIC_API_HOST;

export default function History() {
  const [serviceData, setServiceData] = useState([]);
  const { getToken } = useAuth();
  const [ratings, setRatings] = useState({});

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

  async function saveRatings(id, rating) {
    const url = `${apiHost}/appointments/${id}/rate`;
    try {
      const { data } = await axios.post(
        url,
        { rating },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={[baseStyles.container, { justifyContent: "flex-start" }]}>
      {/* <Text>Service History and reviews</Text> */}
      {serviceData.length > 0 &&
        serviceData.map((item) => {
          return (
            <>
              <Card
                date={item.startTime}
                service={item.service}
                rating={ratings[item.id] || 0}
                onRatingChange={(rating) => {
                  setRatings({ ...ratings, [item.id]: rating });
                  saveRatings(item.id, rating);
                }}
              />
            </>
          );
        })}
    </View>
  );
}
