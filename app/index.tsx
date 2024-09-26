import React, { useRef, useEffect } from "react";
import { Animated, View, StyleSheet, Dimensions, Image } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = 200;

const images = [
  {
    id: "1",
    imageSource: require("../assets/Card_Image_Portrait_1.png"),
  },
  {
    id: "2",
    imageSource: require("../assets/Card_Image_Portrait_2.png"),
  },
  {
    id: "3",
    imageSource: require("../assets/Card_Image_Portrait_3.png"),
  },
  {
    id: "4",
    imageSource: require("../assets/Card_Image_Portrait_4.png"),
  },
  {
    id: "5",
    imageSource: require("../assets/Card_Image_Portrait_5.png"),
  },
  {
    id: "6",
    imageSource: require("../assets/Card_Image_Portrait_6.png"),
  },
  {
    id: "7",
    imageSource: require("../assets/Card_Image_Portrait_7.png"),
  },
  {
    id: "8",
    imageSource: require("../assets/Card_Image_Portrait_8.png"),
  },
  {
    id: "9",
    imageSource: require("../assets/Card_Image_Portrait_9.png"),
  },
  {
    id: "10",
    imageSource: require("../assets/Card_Image_Portrait_10.png"),
  },
];

const NUM_CARDS = images.length;

const Index = () => {
  const topRow = useRef(new Animated.Value(0)).current;
  const bottomRow = useRef(new Animated.Value(0)).current;

  const animateTopRow = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(topRow, {
          toValue: -width,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(topRow, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const animateBottomRow = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bottomRow, {
          toValue: -width,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(bottomRow, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    animateTopRow();
    animateBottomRow();
  }, []);

  const renderCards = (animValue: Animated.Value, topPosition: number) => {
    return (
      <Animated.View
        style={[
          styles.row,
          {
            transform: [{ translateX: animValue }],
            top: topPosition,
          },
        ]}
      >
        {/* {Array.from({ length: NUM_CARDS }).map((_, index: number) => (
          <View key={index}>
            <Image
              style={styles.card}
              source={require("../assets/Card_Image_Portrait_Left.png")}
            ></Image>
            <Image
              style={styles.card}
              source={require("../assets/Card_Image_Portrait_3.png")}
            ></Image>
            <Image
              style={styles.card}
              source={require("../assets/Card_Image_Portrait_5.png")}
            ></Image>
            <Image
              style={styles.card}
              source={require("../assets/Card_Image_Portrait_4.png")}
            ></Image>
          </View>
        ))} */}
        {images.map((image) => (
          <Image
            key={image.id}
            style={styles.card}
            source={image.imageSource}
          ></Image>
        ))}
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {renderCards(topRow, 0)}
      {renderCards(bottomRow, 110)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    position: "absolute",
    width: CARD_WIDTH * NUM_CARDS,
  },
  card: {
    width: CARD_WIDTH,
    height: 100,
    margin: 5,
    // backgroundColor: "grey",
    borderRadius: 10,
  },
});

export default Index;
