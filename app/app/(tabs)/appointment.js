import axios from "axios";
import dayjs from "dayjs";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, Pressable, TextInput } from "react-native";
import { Calendar } from "react-native-calendars";
import { useAuth } from "@clerk/clerk-expo";

import { baseStyles, palette } from "../styles/styles";

const apiHost = process.env.EXPO_PUBLIC_API_HOST;

export default function Appointment() {
  const { getToken } = useAuth();
  const [appointmentData, setAppointmentData] = useState({
    service: "",
    start: null,
    // start: "2023-11-28T15:23:33.556Z",
    // end: "2023-11-28T16:23:33.556Z",
  });
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
  // const [appointmentDate, setAppointmentDate] = useState("");
  // const selectedDate = appointmentData.start.dateString;

  function handleChange(element, value) {
    setAppointmentData((prev) => {
      return {
        ...prev,
        [element]: value,
      };
    });
  }

  async function handleSubmit() {
    const url = `${apiHost}/profile/add-appointment`;
    const dataToSubmit = {
      service: appointmentData.service,
      startTime: appointmentData.start,
    };
    try {
      await axios.post(url, dataToSubmit, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <Text>Book an Appointment</Text>
      <View>
        <Calendar
          minDate={tomorrow}
          maxDate={dayjs(tomorrow).add(30, "day").format("YYYY-MM-DD")}
          onDayPress={(day) => {
            console.log("selected day", day);
            console.log("selected dateString", day.dateString);
            console.log(
              "selected ISOString",
              dayjs(day.dateString).add(8, "hour").toISOString()
            );

            setAppointmentData({
              ...appointmentData,
              start: dayjs(day.dateString).add(8, "hour"),
            });
          }}
          markedDates={
            appointmentData.start
              ? {
                  [appointmentData.start.format("YYYY-MM-DD")]: {
                    selected: true,
                    selectedColor: "steelblue",
                  },
                }
              : {}
          }
        />
      </View>
      {appointmentData.start ? (
        <View>
          <Text>
            You have selected an appointment for{" "}
            {dayjs(appointmentData.start).format("DD.MM.YYYY")}
          </Text>
          <Text>
            {dayjs(appointmentData.start).format("HH:mm")} -{" "}
            {dayjs(appointmentData.start).add(9, "hour").format("HH:mm")}
          </Text>
          <View style={[baseStyles.formGroup]}>
            <Text style={[baseStyles.label]}>Purpose of the service</Text>
            <TextInput
              selectionColor={palette.white}
              style={[baseStyles.input]}
              onChangeText={(value) => handleChange("service", value)}
              value={appointmentData.service}
            />
          </View>
          <Pressable
            style={{
              backgroundColor: "steelblue",
              width: 150,
              borderRadius: 5,
              height: 50,
            }}
            onPress={handleSubmit}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Click to confirm
            </Text>
          </Pressable>
        </View>
      ) : null}

      <Link href="/">Home</Link>
      <Link href="/message">Messages</Link>

      <Link href="/history">History</Link>
    </View>
  );
}
