import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import SafeViewAndroid from "../components/SafeViewAndroid";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import format from "pretty-format";

const LoginScreen = () => {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 50,
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.222.68:8000/login", user)
      .then((response) => {
        console.log(format(response));
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Home");
        // Remove all previous stack, user can't backpress
      })
      .catch((error) => {
        if (error.response.status === 401) {
          Alert.alert("Login Error", "Invalid password");
        } else if (error.response.status === 404) {
          Alert.alert("Login Error", "Invalid email");
        }
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <SafeAreaView
          style={[styles.container, SafeViewAndroid.AndroidSafeArea]}
        >
          <Image
            style={{ width: 150, height: 150 }}
            source={require("../assets/w.png")}
          />

          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 23,
                fontWeight: "bold",
                marginTop: 12,
                color: "#041E42",
              }}
            >
              Login to your account
            </Text>

            <View
              style={{
                marginTop: 30,
                width: Dimensions.get("window").width * 0.9,
              }}
            >
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
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={{
                    width: 300,
                    color: "#808080",
                    marginVertical: 10,
                    fontSize: email ? 16 : 16,
                  }}
                  placeholder="Enter your email"
                ></TextInput>
              </View>
            </View>

            <View
              style={{
                marginTop: 30,
                width: Dimensions.get("window").width * 0.9,
              }}
            >
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
                  name="lock"
                  size={24}
                  color="#808080"
                />
                <TextInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={!showPassword}
                  style={{
                    flex: 1,
                    color: "#808080",
                    marginVertical: 10,
                    fontSize: password ? 16 : 16,
                  }}
                  placeholder="Enter your password"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialCommunityIcons
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color="#808080"
                    style={{ marginHorizontal: 8 }}
                    onPress={toggleShowPassword}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={{
              width: Dimensions.get("window").width * 0.9,
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>Keep logging in</Text>
            <Text style={{ color: "#007FFF", fontWeight: 500 }}>
              Forgot password
            </Text>
          </View>

          <View style={{ marginTop: 50 }} />

          <Pressable
            onPress={handleLogin}
            style={{
              width: 180,
              backgroundColor: "#5B92E5",
              borderRadius: 6,
              marginHorizontal: "auto",
              padding: 13,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 19,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Log In
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 10 }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "gray",
                fontSize: 16,
              }}
            >
              Don't have account yet?{" "}
              <Text style={{ color: "#007FFF" }}>Sign up</Text>
            </Text>
          </Pressable>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
