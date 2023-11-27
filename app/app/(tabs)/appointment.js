import dayjs from "dayjs";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { Calendar } from "react-native-calendars";

export default function Appointment() {
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
  const [appointmentDate, setAppointmentDate] = useState("");
  const selectedDate = appointmentDate.dateString;
  return (
    <View>
      <Text>Book an Appointment</Text>
      <View>
        <Calendar
          minDate={tomorrow}
          maxDate={dayjs(tomorrow).add(30, "day").format("YYYY-MM-DD")}
          onDayPress={(day) => {
            setAppointmentDate(day);
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
          <Pressable
            style={{
              backgroundColor: "steelblue",
              width: 150,
              borderRadius: 5,
              height: 50,
            }}
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
