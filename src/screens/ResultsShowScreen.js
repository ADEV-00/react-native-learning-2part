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

  console.log(result);
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
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Info
        </Text>
        <Text>
          Address:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {" "}
            {result.location.display_address}
          </Text>
        </Text>
        <Text>
          Phone Number:{" "}
          <Text style={{ fontWeight: "bold" }}>{result.display_phone}</Text>
        </Text>
        <Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300,
    borderWidth: 10,
    borderColor: "white",
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
  infoWrapper: {
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default ResultsShowScreen;
