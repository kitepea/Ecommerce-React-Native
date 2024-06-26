import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import SafeViewAndroid from "../components/SafeViewAndroid";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { format as prettyFormat } from "pretty-format"; // ES2015 modules

const RegisterScreen = () => {
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
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = () => {
    const user = {
      email: email,
      name: name,
      password: password,
    };

    // send post request to backend
    axios
      // url change
      .post("http://192.168.1.44:8000/register", user)
      .then((response) => {
        console.log(prettyFormat(response));
        Alert.alert(
          "Registration successful",
          "You have been registered Successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
        console.log("registration failed:", error);
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
              Register to your account
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
                  name="person"
                  size={24}
                  color="#808080"
                />
                <TextInput
                  value={name}
                  onChangeText={(text) => setName(text)}
                  style={{
                    color: "#808080",
                    marginVertical: 10,
                    fontSize: name ? 16 : 16,
                  }}
                  placeholder="Enter your name"
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

          <View style={{ marginTop: 50 }} />

          <Pressable
            onPress={handleRegister}
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
              Register
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={{ marginTop: 10 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Already have an account?{" "}
              <Text style={{ color: "#007FFF" }}>Sign In</Text>
            </Text>
          </Pressable>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
