import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import SafeViewAndroid from "../components/SafeViewAndroid";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      marginTop: 50,
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
              fontSize: 23,
              fontWeight: "bold",
              marginTop: 12,
              color: "#041E42",
            }}
          >
            Login to your account
          </Text>

          <View style={{ marginTop: 30 }}>
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
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={{
                  width: 300,
                  color: "#808080",
                  marginVertical: 10,
                  fontSize: password ? 16 : 16,
                }}
                placeholder="Enter your password"
              ></TextInput>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Keep logged in</Text>
          <Text style={{ color: "#007FFF", fontWeight: 500 }}>
            Forgot password
          </Text>
        </View>

        <View style={{ marginTop: 50 }} />

        <Pressable
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
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Don't have account yet? Sign up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
