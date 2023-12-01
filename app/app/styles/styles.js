import { StyleSheet } from "react-native";

export const palette = {
  darkBlue: "#00072d",
  mediumBlue: "#103FEF",
  lightBlue: "#e0fbfc",
  black: "#293241",
  white: "#eeffff",
  highlight: "#ee6c4d",
};

export const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.darkBlue,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    color: palette.white,
    fontSize: 16,
  },
  heading: {
    color: palette.white,
    fontSize: 40,
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    borderColor: palette.mediumBlue,
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonText: {
    color: palette.white,
    fontSize: 20,
  },
  label: {
    color: palette.black,
    fontSize: 12,
    fontWeight: 300,
    alignSelf: "flex-start",
    padding: 0,
  },
  input: {
    color: palette.black,
    width: "100%",
    margin: 0,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: palette.black,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  formGroup: {
    width: "100%",
    gap: 4,
  },
});
