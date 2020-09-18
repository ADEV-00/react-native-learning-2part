import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import ResultsList from "../components/ResultsList";
import yelp from "../api/yelp";

const ResultsShowScreen = ({ route }) => {
  const [result, setResult] = useState(null);
  const id = route.params?.id ?? "Something went wrong";
  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };
  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  return (
    <View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
      <Text style={styles.ratingWrapper}>{result.rating} Stars</Text>
      <Text style={styles.titleWrapper}>{result.name}</Text>
      <View style={styles.infoWrapper}>
        <Text>Info</Text>
        <Text>Address: {result.location.display_address}</Text>
        <Text>Phone Number: {result.display_phone}</Text>
        <Text>{result.hours.is_open_now ? "Open" : "Closed"}</Text>
        <Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300,
  },
  titleWrapper: {
    fontSize: 19,
    fontWeight: "bold",
    alignSelf: "center",
    margin: 10,
  },
  ratingWrapper: {
    padding: 8,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    backgroundColor: "white",
    position: "absolute",
    top: 160,
    right: 10,
  },
});

export default ResultsShowScreen;
