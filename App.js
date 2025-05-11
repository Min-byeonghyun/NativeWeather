import React from "react";
import { View, StyleSheet, Text, ScrollView , Dimensions } from "react-native";

const { width : SCREEN_WIDTH} = Dimensions.get('window');


export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView 
      pagingEnabled // 스크롤 하기 좋게 바꾸기
      horizontal // 가로 스크롤 변경
      showsHorizontalScrollIndicator={false} // 아래 바 제거
      contentContainerStyle={styles.weather}>
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
    borderBottomWidth : 2,
  },
  cityName: {
    fontSize: 70,
    fontWeight: "500",
  },
  weather: {
    backgroundColor: "tomato",
  },
  day: {
    width : SCREEN_WIDTH,
    alignItems: "center",
  },

  temp: {
    marginTop : 45,
    fontSize : 170,
  },
  description: {
    marginTop : -20,
    fontSize : 60,
  },
});
