import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import React from "react";
import SafeViewAndroid from "../components/SafeViewAndroid";
import { MaterialIcons } from "@expo/vector-icons";

const LoginScreen = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      marginTop: 50,
    },
  });
  return (
    <SafeAreaView style={[styles.container, SafeViewAndroid.AndroidSafeArea]}>
      <Image
        style={{ width: 150, height: 150 }}
        source={require("../assets/w.png")}
      />

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 12,
              color: "#041E42",
            }}
          >
            Login to your account
          </Text>

          <View style={{ marginTop: 70 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <MaterialIcons
                style={{ marginHorizontal: 8 }}
                name="email"
                size={24}
                color="#808080"
              />
              <TextInput
                style={{ width: 300, color: "#808080", marginVertical: 10 }}
                placeholder="Enter your email"
              ></TextInput>
            </View>
          </View>

          <View style={{ marginTop: 30 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
              }}
            >
              <MaterialIcons
                style={{ marginHorizontal: 8 }}
                name="password"
                size={24}
                color="#808080"
              />
              <TextInput
                style={{ width: 300, color: "#808080", marginVertical: 10 }}
                placeholder="Enter your password"
              ></TextInput>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
