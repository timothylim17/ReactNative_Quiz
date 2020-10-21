import React from "react";
import { TouchableOpacity, View, StyleSheet, Text, Alert } from "react-native";

import { fetchData, deleteData } from "quiz/App/util/Storage";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    marginHorizontal: 110,
    marginTop: 30,
  },
  container: {
    backgroundColor: "#f1c40f",
    flex: 1,
    paddingVertical: 150,
  },
  results: {
    fontSize: 35,
    textAlign: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
});

class Summary extends React.Component {
  state = {
    correctCount: null,
    totalCount: null,
  };

  componentDidMount() {
    fetchData()
      .then((response) => {
        const res = response;
        console.log(res);
        this.state.correctCount = res.correctCount;
        this.state.totalCount = res.totalCount;
        this.setState({});
      })
      .catch((e) => {
        console.log("Something didn't work: ", e);
      });
  }

  twoButtonAlert = () => {
    Alert.alert(
      "Clearing Storage",
      "Are you sure?",
      [
        {
          text: "No",
          onPress: () => {
            console.log("User pressed cancel");
          },
        },
        {
          text: "OK",
          onPress: () => {
            deleteData();
            console.log("Data deleted!");
            this.props.navigation.navigate("QuizIndex");
          },
        },
      ],
      { cancelable: true }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.results}>
          {`Number of Correct: ${this.state.correctCount}`}
        </Text>
        <Text style={styles.results}>
          {`Number of Questions: ${this.state.totalCount}`}
        </Text>
        <Text style={styles.results}>
          {`You got a ${
            (this.state.correctCount / this.state.totalCount) * 100
          }%`}
        </Text>
        <TouchableOpacity onPress={this.twoButtonAlert} style={styles.button}>
          <Text>Delete Cache</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Summary;
