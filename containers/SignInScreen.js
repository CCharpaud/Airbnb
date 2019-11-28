import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from "react-native";
import Constants from "expo-constants";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("arno@airbnb-api.com");
  const [password, setPassword] = useState("password01");

  return (
    <ScrollView style={{ backgroundColor: "#FF5A5F" }}>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          paddingTop: Constants.statusBarHeight,

          backgroundColor: "#FF5A5F"
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Entypo
            style={{ marginTop: 30 }}
            name="home"
            size={120}
            color="white"
          />
          <Text style={{ color: "white", fontSize: 55, marginTop: 40 }}>
            Welcome
          </Text>
          <View>
            <TextInput
              style={{
                width: 250,
                color: "white",
                marginTop: 60,
                fontSize: 30,
                marginLeft: 20
              }}
              placeholder="email"
              placeholderTextColor="white"
              onChangeText={text => {
                setEmail(text);
              }}
              value={email}
            />

            <Text style={{ color: "white" }}>
              __________________________________________________
            </Text>
            <TextInput
              style={{
                width: 250,
                color: "white",
                marginTop: 40,
                fontSize: 30,
                marginLeft: 20
              }}
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry={true}
              onChangeText={text => {
                setPassword(text);
              }}
              value={password}
            />
            <Text style={{ color: "white" }}>
              __________________________________________________
            </Text>
          </View>

          <TouchableOpacity
            onPress={async () => {
              const response = await axios.post(
                "https://airbnb-api.now.sh/api/user/log_in",

                {
                  email: email,
                  password: password
                }
              );

              const userToken = response.data.token;
              setToken(userToken);
              // console.log(response.data);
            }}
            style={{
              marginTop: 50,
              backgroundColor: "white",
              padding: 20,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 10,
              marginVertical: 0,
              width: 180
            }}
          >
            <Text style={{ color: "#FF5A5F", fontSize: 30 }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
