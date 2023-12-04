import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { Text, View, Pressable, TextInput, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";

import { baseStyles, palette } from "../styles/styles";

const apiHost = process.env.EXPO_PUBLIC_API_HOST;

export default function Appointment() {
  const [shouldShow, setShouldShow] = useState(true);
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View>
        {shouldShow ? (
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
                      selectedColor: palette.highlight,
                    },
                  }
                : {}
            }
          />
        ) : null}
      </View>
      {appointmentData.start ? (
        <View style={[baseStyles.container, { flex: 1 }]}>
          <Text style={[baseStyles.text]}>
            You have selected an appointment for{" "}
          </Text>
          <Text
            style={[
              baseStyles.text,
              { color: palette.highlight, marginTop: 12 },
            ]}
          >
            {dayjs(appointmentData.start).format("dddd DD.MM.YYYY")}
          </Text>
          <Text style={[baseStyles.text, { color: palette.highlight }]}>
            {dayjs(appointmentData.start).format("HH:mm")} -{" "}
            {dayjs(appointmentData.start).add(9, "hour").format("HH:mm")}
          </Text>
          <View style={[baseStyles.formGroup, { marginTop: 12 }]}>
            {shouldShow && (
              <>
                <Text style={[baseStyles.label]}>Purpose of the service</Text>

                <TextInput
                  selectionColor={palette.white}
                  style={[baseStyles.input]}
                  onChangeText={(value) => handleChange("service", value)}
                  value={appointmentData.service}
                />
              </>
            )}
          </View>

          <Pressable
            style={({ pressed }) => {
              return {
                ...baseStyles.button,
                marginTop: 10,
                backgroundColor: pressed
                  ? palette.mediumBlue
                  : palette.darkBlue,
              };
            }}
            onPress={() => {
              if (shouldShow) {
                handleSubmit();
              } else {
                setAppointmentData({
                  service: "",
                  start: null,
                });
              }
              setShouldShow(!shouldShow);
            }}
            // onPress={() => setShouldShow(!shouldShow)}
          >
            {shouldShow ? (
              <Text style={{ textAlign: "center", color: "white" }}>
                Click to confirm
              </Text>
            ) : (
              <Text style={{ textAlign: "center", color: "white" }}>
                Create another appointment
              </Text>
            )}
          </Pressable>
        </View>
      ) : null}
    </ScrollView>
  );
}
