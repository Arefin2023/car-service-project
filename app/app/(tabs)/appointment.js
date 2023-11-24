import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { Calendar } from "react-native-calendars";
export default function Appointment() {
  const [appointmentDate, setAppointmentDate] = useState("");
  // const today = Date().currentDate;
  return (
    <View>
      <Text>Book an Appointment</Text>
      <View>
        <Calendar
          minDate="2023-11-25"
          maxDate="2023-12-25"
          onDayPress={(day) => {
            setAppointmentDate(day);
          }}
          markedDates={{
            "2023-11-30": { selected: true, selectedColor: "steelblue" },
          }}
        />
      </View>
      {appointmentDate !== "" ? (
        <View>
          <Text>
            You have selected an appointment for {appointmentDate.day}.
            {appointmentDate.month}.{appointmentDate.year}
          </Text>
          <Pressable
            style={{
              backgroundColor: "steelblue",
              width: 120,
              borderRadius: 5,
              height: 30,
            }}
          >
            <Text style={{ textAlign: "center" }}>Click to confirm</Text>
          </Pressable>
        </View>
      ) : null}

      <Link href="/">Home</Link>
      <Link href="/message">Messages</Link>

      <Link href="/history">History</Link>
    </View>
  );
}
