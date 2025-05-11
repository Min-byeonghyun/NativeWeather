import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import * as Location from "expo-location";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
export default function App() {
  const [city, setCity] = useState("Loading..."); // city 데이터 저장
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true); // 위치 허용 권한에 필요한 데이터
  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync(); // 위치 설정
    if (!granted) {
      // 위치 허용하지않으면 false 로해서 나중에 슬픈얼굴 보여주기
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 }); //위치가져오기
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city); //location에서 city 정보가져오기
  };
  useEffect(() => {
    ask();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled // 스크롤 하기 좋게 바꾸기
        horizontal // 가로 스크롤 변경
        showsHorizontalScrollIndicator={false} // 아래 바 제거
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  city: {
    flex: 1,
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
  },
  cityName: {
    fontSize: 70,
    fontWeight: "500",
  },
  weather: {
    backgroundColor: "tomato",
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },

  temp: {
    marginTop: 45,
    fontSize: 170,
  },
  description: {
    marginTop: -20,
    fontSize: 60,
  },
});
