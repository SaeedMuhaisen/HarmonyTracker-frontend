import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { AppColors } from '../Styles/AppColors';
import { VictoryPie, VictoryAnimation, VictoryLabel } from 'victory-native';
export default function ({timer,setTimer,state,setState,getData}) {

  useEffect(() => {
    console.log('hello')
    let percent = 0;
    const setStateInterval = setInterval(() => {
      const randomIncrement = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
      percent = (state.percent + randomIncrement) > 100 ? 100 : (state.percent + randomIncrement);
      if (percent < 100) {
        setState({
          percent,
          data: getData(percent)
        });
      } else {
        setState({
          percent,
          data: getData(percent)
        });
        setTimer(0);
      }

    }, timer);
    if (timer == 0) {
      return
    }
    else {
      return () => clearInterval(setStateInterval);
    }
  }, [timer, state.percent]);

  return (
    <Svg>
      <VictoryPie
        animate={{ duration: 1000 }}

        data={state.data}
        innerRadius={140}
        cornerRadius={5}
        labels={() => null}
        style={{
          data: {
            fill: ({ datum }) => {
              const color = AppColors.primaryYellow;
              return datum.x === 1 ? color : AppColors.SecondaryYellow; // Corrected property name
            },
          },

        }}

      />
      <VictoryAnimation duration={1000} data={this.state}>
        {(newProps) => {
          return (
            <VictoryLabel
              textAnchor="middle" verticalAnchor="middle"
              x={200} y={200}
              text={state.percent === 100 ? 'Finished' : `${Math.round(state.percent)}%`}
              style={{ fontSize: 45, fill: 'white' }}
            />
          );
        }}
      </VictoryAnimation>

    </Svg >
  );
}

