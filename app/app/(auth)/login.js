import { View, Text, Pressable, TextInput } from "react-native";
import { baseStyles, palette } from "../../styles/styles";
import { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";

function LoginPage() {
  const [signIn, setActive, isLoaded] = useSignIn();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(element, value) {
    setFormData((prev) => {
      return {
        ...prev,
        [element]: value,
      };
    });
  }

  async function handleSubmit() {
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignIn = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
      // ADD THIS LINE:
      router.replace("/");
      // ClerkProvider now knows that the user is logged in and will render the previously protected route
    } catch (err) {
      Alert.alert("Error", "Login failed - please try again.");
      console.log(err);
    }
  }
  return (
    <View style={[baseStyles.container]}>
      <Text style={[baseStyles.heading]}>Login</Text>
      <View style={[{ width: "100%", gap: 12 }]}>
        <View style={[baseStyles.formGroup]}>
          <Text style={[baseStyles.label]}>Email</Text>
          <TextInput
            autoCapitalize="none"
            selectionColor={palette.white}
            style={[baseStyles.input]}
            onChangeText={(value) => handleChange("email", value)}
            value={formData.email}
          />
        </View>
        <View style={[baseStyles.formGroup]}>
          <Text style={[baseStyles.label]}>Password</Text>
          <TextInput
            selectionColor={palette.white}
            style={[baseStyles.input]}
            onChangeText={(value) => handleChange("password", value)}
            value={formData.password}
            secureTextEntry={true}
          />
        </View>
        <Pressable
          style={({ pressed }) => {
            return {
              ...baseStyles.button,
              marginTop: 10,
              borderColor: pressed ? palette.white : palette.mediumBlue,
            };
          }}
          onPress={() => handleSubmit()}
        >
          <Text style={[baseStyles.text]}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default LoginPage;
