import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnimatedCircle = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.circle}></View>
        <View style={[styles.circle, styles.circle2]}></View>
        <View style={[styles.circle, styles.circle3]}></View>
        <View style={styles.shadow}></View>
        <View style={[styles.shadow, styles.shadow2]}></View>
        <View style={[styles.shadow, styles.shadow3]}></View>
        <Text style={styles.text}>LOADING</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'radial-gradient(#9b59b6, #8e44ad)',
  },
  wrapper: {
    width: 200,
    height: 60,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -100 }, { translateY: -30 }],
  },
  circle: {
    width: 20,
    height: 20,
    position: 'absolute',
    borderRadius: 10,
    backgroundColor: '#fff',
    left: '15%',
    transformOrigin: '50%',
    animationDuration: 0.5,
    animationTimingFunction: 'ease',
    animationDirection: 'alternate',
    animationIterationCount: 'infinite',
  },
  circle2: {
    left: '45%',
    animationDelay: 0.2,
  },
  circle3: {
    left: 'auto',
    right: '15%',
    animationDelay: 0.3,
  },
  shadow: {
    width: 20,
    height: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 62,
    transformOrigin: '50%',
    zIndex: -1,
    left: '15%',
    filter: 'blur(1px)',
    animationDuration: 0.5,
    animationTimingFunction: 'ease',
    animationDirection: 'alternate',
    animationIterationCount: 'infinite',
  },
  shadow2: {
    left: '45%',
    animationDelay: 0.2,
  },
  shadow3: {
    left: 'auto',
    right: '15%',
    animationDelay: 0.3,
  },
  text: {
    position: 'absolute',
    top: 75,
    fontFamily: 'Lato',
    fontSize: 20,
    letterSpacing: 12,
    color: '#fff',
    left: '15%',
  },
});

export default AnimatedCircle;