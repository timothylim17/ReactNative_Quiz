import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import QuizIndex from "./screens/QuizIndex";
import Quiz from "./screens/Quiz";
import Summary from "./screens/Summary";

// const styles = StyleSheet.create({
//   headerButton: {},
// });

const HeaderLeftButton = ({ onPress, style, icon }) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      source={icon}
      resizeMode="contain"
      style={[
        {
          marginLeft: 10,
          width: 20,
          height: 20,
          tintColor: "#000",
        },
        style,
      ]}
    />
  </TouchableOpacity>
);

const MainStack = createStackNavigator({
  QuizIndex: {
    screen: QuizIndex,
    navigationOptions: {
      headerTitle: "Quizzes",
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.getParam("title"),
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: navigation.getParam("color"),
        borderBottomColor: navigation.getParam("color"),
      },
    }),
  },
  Summary: {
    screen: Summary,
    navigationOptions: ({ navigation }) => ({
      headerLeft: () => (
        <HeaderLeftButton
          icon={require("./assets/close.png")}
          onPress={() => navigation.navigate("QuizIndex")}
          style={{ tintColor: "#000" }}
        />
      ),
    }),
  },
});

export default createAppContainer(MainStack);
