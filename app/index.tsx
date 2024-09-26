import React, { useRef, useEffect } from "react";
import { Animated, View, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = 200;
const NUM_CARDS = 4;

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
        {Array.from({ length: NUM_CARDS }).map((_, index: number) => (
          <View key={index} style={styles.card} />
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
    backgroundColor: "grey",
    borderRadius: 10,
  },
});

export default Index;
