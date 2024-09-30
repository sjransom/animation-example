import React, { useRef, useEffect } from "react";
import { Animated, View, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "./data";

const CARD_HEIGHT = 100;
const CARD_WIDTH = 200;
const NUM_CARDS = images.length;
const totalCardWidth = CARD_WIDTH * NUM_CARDS;

const Index = () => {
  const topRow = useRef(new Animated.Value(0)).current;
  const bottomRow = useRef(new Animated.Value(0)).current;

  const animateTopRow = () => {
    Animated.loop(
      Animated.timing(topRow, {
        toValue: -totalCardWidth,
        duration: 21000,
        useNativeDriver: true,
      })
    ).start();
  };

  const animateBottomRow = () => {
    Animated.loop(
      Animated.timing(bottomRow, {
        toValue: -totalCardWidth,
        duration: 24000,
        useNativeDriver: true,
      })
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
        {[...images, ...images].map((image, index) => (
          <Image key={index} style={styles.card} source={image.imageSource} />
        ))}
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.6)"]}
        style={styles.gradientOverlay}
      />
      <View style={styles.cinemaContainer}>
        <Image
          style={{ width: 80, height: 80 }}
          source={require("../assets/sky-cinema.png")}
        />
      </View>
      <View style={styles.rowContainer}>
        {renderCards(topRow, 0)}
        {renderCards(bottomRow, 110)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    maxHeight: 250,
    position: "relative",
  },
  cinemaContainer: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 3,
    top: 70,
  },
  rowContainer: {
    position: "relative",
    zIndex: 1,
  },
  row: {
    flexDirection: "row",
    position: "absolute",
    width: totalCardWidth * 2,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    margin: 5,
    borderRadius: 10,
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    zIndex: 2,
  },
});

export default Index;
