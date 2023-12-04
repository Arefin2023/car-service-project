import { View, Text } from "react-native";

import { baseStyles, palette } from "../styles/styles";
export default function Card(props) {
  return (
    <View style={baseStyles.card}>
      <Text style={[baseStyles.text]}>{props.date}</Text>
      <Text style={[baseStyles.heading]}>{props.service}</Text>
    </View>
  );
}
