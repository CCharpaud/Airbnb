import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
import { Text, View, StatusBar, Image, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import Tab from "../components/Tab";

export default function ProfileScreen() {
  const [location, setLocation] = useState(null);
  const { params } = useRoute();

  useEffect(() => {
    const askPermission = async () => {
      // Va afficher une alerte pour demander la permission (seulement la premiere fois où on demande)
      const obj = await Permissions.askAsync(Permissions.LOCATION);

      if (obj.status === "granted") {
        // Va obtenir les coordonnees GPS
        const location = await Location.getCurrentPositionAsync({});

        // alert(JSON.stringify(location));
        setLocation(location);
      }
    };

    askPermission();
  }, []);

  return (
    <ScrollView>
      <StatusBar barStyle="light-content" />
      <View>
        <Image
          style={{ width: "100%", height: 350 }}
          resizeMode="cover"
          source={{ uri: params.photo }}
        ></Image>
        <View
          style={{
            backgroundColor: "black",
            width: 100,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            marginTop: 270
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 25
            }}
          >
            {params.price + "€"}
          </Text>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "200"
          }}
        >
          {params.title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 15
          }}
        >
          <Tab item={params} />
          <Text
            style={{
              fontWeight: "200",
              marginLeft: 10,

              color: "grey"
              /* backgroundColor: "yellow" */
            }}
          >
            {params.ratingValue} reviews
          </Text>
        </View>

        <View
          style={{
            position: "absolute",
            alignSelf: "flex-end",
            paddingRight: 15,
            paddingTop: 15
          }}
        >
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 30
            }}
            resizeMode="contain"
            source={{ uri: params.accountPhoto[0] }}
          />
        </View>

        <View style={{ paddingTop: 20 }}>
          <Text numberOfLines={3} style={{ fontWeight: "200" }}>
            {params.description}
          </Text>
        </View>

        {location && (
          <MapView
            showsUserLocation={true}
            provider="google"
            style={{ height: 200, marginTop: 20 }}
            initialRegion={{
              latitude: params.latitude,
              longitude: params.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: params.latitude,
                longitude: params.longitude
              }}
            />
          </MapView>
        )}
      </View>
    </ScrollView>
  );
}
