import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { Calendar } from "react-native-calendars";
export default function Appointment() {
  const [appointmentDate, setAppointmentDate] = useState("");
  return (
    <View>
      <Text>Book an Appointment</Text>
      <View>
        <Calendar
          onDayPress={(day) => {
            setAppointmentDate(day);
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
              width: 100,
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
