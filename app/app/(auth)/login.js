import { useSignIn, useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { View, Text, Pressable, TextInput, Alert } from "react-native";

import { useWarmUpBrowser } from "../hooks/useWarmupBrowser";
import { baseStyles, palette } from "../styles/styles";

WebBrowser.maybeCompleteAuthSession();

function LoginPage() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { startOAuthFlow: startGoogleFlow } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startGithubFlow } = useOAuth({
    strategy: "oauth_github",
  });
  const oAuthFlows = {
    google: { start: startGoogleFlow },
    github: { start: startGithubFlow },
  };
  useWarmUpBrowser();
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
  async function handleOAuthLogin(type) {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await oAuthFlows[type].start();

      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
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
            secureTextEntry
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
        <Pressable
          style={({ pressed }) => {
            return {
              ...baseStyles.button,
              marginTop: 10,
              borderColor: pressed ? palette.white : palette.mediumBlue,
            };
          }}
          onPress={() => handleOAuthLogin("google")}
        >
          <Text style={[baseStyles.text]}>Login with Google</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => {
            return {
              ...baseStyles.button,
              marginTop: 10,
              borderColor: pressed ? palette.white : palette.mediumBlue,
            };
          }}
          onPress={() => handleOAuthLogin("github")}
        >
          <Text style={[baseStyles.text]}>Login with GitHub</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default LoginPage;
