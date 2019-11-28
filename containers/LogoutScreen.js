import React from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  View
} from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function LogOutScreen({ setToken }) {
  return (
    <ScrollView
      style={{
        backgroundColor: "#FF5A5F",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <StatusBar barStyle="light-content" />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 80
        }}
      >
        <Entypo name="hand" size={80} color="white" />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 30,
          alignItems: "center",
          justifyContent: "center",
          width: 180
        }}
        onPress={() => {
          setToken(null);
        }}
      >
        <View>
          <Text style={{ color: "#FF5A5F", fontSize: 30 }}>Logout</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
