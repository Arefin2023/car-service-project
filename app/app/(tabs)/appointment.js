import { axios } from "axios";
import dayjs from "dayjs";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, Pressable, TextInput } from "react-native";
import { Calendar } from "react-native-calendars";

import { baseStyles, palette } from "../styles/styles";

export default function Appointment() {
  const [appointmentData, setAppointmentData] = useState({
    service: "",
    start: "2023-11-28T15:23:33.556Z",
    end: "2023-11-28T15:23:33.556Z",
  });
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
  const [appointmentDate, setAppointmentDate] = useState("");
  const selectedDate = appointmentDate.dateString;

  function handleChange(element, value) {
    setAppointmentData((prev) => {
      return {
        ...prev,
        [element]: value,
      };
    });
  }

  async function handleSubmit() {
    const url = "http://192.168.178.51:3000/appointments";
    const dataToSubmit = {
      customerId: 1,
      vehicleId: 12345,
      service: appointmentData.service,
      start: appointmentData.start,
      end: appointmentData.end,
    };
    try {
      await axios.post(url, dataToSubmit);
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
            setAppointmentDate(day);
            handleChange("start", day);
            handleChange("end", dayjs(day).add(1, "hour"));
          }}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "steelblue" },
          }}
        />
      </View>
      {appointmentDate !== "" ? (
        <View>
          <Text>
            You have selected an appointment for{" "}
            {dayjs(selectedDate).format("DD.MM.YYYY")}
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
