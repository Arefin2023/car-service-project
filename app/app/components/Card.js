import { Text, View } from "react-native";
import dayjs from "dayjs";
// eslint-disable-next-line
import StarRating from "react-native-star-rating";
import { palette, baseStyles } from "../styles/styles";

export default function Card({ date, service, rating, onRatingChange }) {
  return (
    <View style={[baseStyles.card, { width: "100%" }]}>
      <Text style={[baseStyles.text, { color: palette.darkBlue }]}>
        {dayjs(date).format("dddd DD.MM.YYYY")}
      </Text>
      <Text style={[baseStyles.heading, { color: palette.darkBlue }]}>
        {service}
      </Text>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={rating}
        selectedStar={onRatingChange}
      />
    </View>
  );
}
