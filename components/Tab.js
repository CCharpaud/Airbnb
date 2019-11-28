import React from "react";
import { Text, View, ImageBackground, Image } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

export default function Tab(props) {
  const { item } = props;

  stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < item.ratingValue) {
      stars.push(<EvilIcons key={i} name="star" color="gold" size={20} />);
    } else {
      stars.push(<EvilIcons key={i} name="star" color="grey" size={20} />);
    }
  }

  return <Text>{stars}</Text>;
}
