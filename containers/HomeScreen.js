import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  Text,
  View,
  FlatList,
  Image,
  StatusBar
} from "react-native";
import axios from "axios";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { EvilIcons } from "@expo/vector-icons";
import Tab from "../components/Tab";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://airbnb-api.now.sh/api/room?city=paris"
        );

        // Est-ce que j'ai bien reçu un tableau rooms
        if (response.data.rooms) {
          setRooms(response.data.rooms);
          setIsLoading(false);
        } else {
          alert("An error occurred");
        }
      } catch (e) {
        alert("An error occurred");
      }
    };

    fetchData();
  }, []);

  console;
  return (
    <>
      {isLoading === true ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <FlatList
          data={rooms}
          renderItem={({ item }) => {
            return (
              <View style={{ padding: 10 }}>
                <StatusBar barStyle="light-content" />
                <View style={{ height: 280 }}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Profile", {
                          userId: item._id,
                          title: item.title,
                          photo: item.photos[0],
                          price: item.price,
                          ratingValue: item.ratingValue,
                          accountPhoto: item.user.account.photos,
                          description: item.description,
                          latitude: item.loc[1],
                          longitude: item.loc[0]
                        });
                      }}
                    >
                      <Image
                        style={{ width: "100%", height: 190 }}
                        source={{ uri: item.photos[0] }}
                      />
                      <View
                        style={{
                          backgroundColor: "black",
                          width: 60,
                          height: 50,
                          justifyContent: "center",
                          alignItems: "center",
                          position: "absolute",
                          marginTop: 135
                        }}
                      >
                        <Text
                          style={{
                            color: "white"
                          }}
                        >
                          {item.price + "€"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "200",
                          paddingTop: 15
                        }}
                      >
                        {item.title}
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingTop: 10
                        }}
                      >
                        <Tab item={item} />

                        <Text
                          style={{
                            fontWeight: "200",
                            marginLeft: 10,
                            color: "grey"
                            /* backgroundColor: "yellow" */
                          }}
                        >
                          {item.ratingValue} reviews
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        position: "absolute",
                        alignSelf: "flex-end",
                        paddingRight: 5,
                        paddingTop: 15
                      }}
                    >
                      <Image
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                        resizeMode="contain"
                        source={{ uri: item.user.account.photos[0] }}
                      />
                    </View>
                  </View>
                </View>
                <Text
                  style={{
                    alignSelf: "center",
                    color: "grey",
                    fontWeight: "100"
                  }}
                >
                  ____________________________________________________________{" "}
                </Text>
              </View>
            );
          }}
          keyExtractor={room => {
            return room._id;
          }}
        />
      )}
    </>
  );
}
