import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import Fontisto from '@expo/vector-icons/Fontisto';

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "21b3f9c0ebe840e8c9dc6ff332bcf332";

const icons = {
  Clouds : "cloudy",
  Rain : 'rains',
  Clear : 'day-sunny',
  Atomosphere : 'cloudy-gusts',
  Snow: 'snow',
  Drizzle : 'rain',
  Thunderstorm : 'lightning',
}

export default function App() {
  const [city, setCity] = useState("Loading..."); // city 데이터 저장
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true); // 위치 허용 권한에 필요한 데이터
  const getWeather = async () => {
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
    const { list } = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      )
    ).json();
    const filteredList = list.filter(({ dt_txt }) =>
      dt_txt.endsWith("00:00:00")
    );
    setDays(filteredList);
  };
  useEffect(() => {
    getWeather();
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
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              size="large"
              style={{ marginTop: 10 }}
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <View style={{ 
                flexDirection : 'row' ,
                 alignItems: 'center',
                 width : '100%',
                justifyContent : 'space-between'
                 }}>
              <Text style={styles.temp}>
                {Math.round(day.main.temp - 273.15)}℃
              </Text>
              <Fontisto name={icons[day.weather[0].main]} size={40} color="white" />
              </View>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
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
  },
  cityName: {
    color : 'white',
    fontSize: 70,
    fontWeight: "500",
  },
  weather: {
    backgroundColor: "tomato",
  },
  day: {
    width: SCREEN_WIDTH,
    padding : 15,
  },

  temp: {
    color : 'white',
    marginTop: 45,
    fontSize: 110,
  },
  description: {
    color : 'white',
    marginTop: -20,
    fontSize: 50,
  },
  tinyText: {
    color : 'white',
    fontSize : 20,
  }
});
