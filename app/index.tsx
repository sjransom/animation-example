import React, { useRef, useEffect } from "react";
import { Animated, View, StyleSheet, Image } from "react-native";
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
        duration: 11000,
        useNativeDriver: true,
      })
    ).start();
  };

  const animateBottomRow = () => {
    Animated.loop(
      Animated.timing(bottomRow, {
        toValue: -totalCardWidth,
        duration: 14000,
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
    width: totalCardWidth * 2,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    margin: 5,
    borderRadius: 10,
  },
});

export default Index;
