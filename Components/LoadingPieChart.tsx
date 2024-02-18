import React, { useState, useEffect } from 'react';
import Svg from 'react-native-svg';
import { AppColors } from '../Styles/AppColors';
import { VictoryPie, VictoryAnimation, VictoryLabel } from 'victory-native';

export default function ({ timer, setTimer, state, setState, getData }) {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);

  useEffect(() => {
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
    if (timer === 0) {
      return () => clearInterval(setStateInterval);
    }
    return () => clearInterval(setStateInterval);
  }, [timer, state.percent, setState, setTimer, getData]);
  return (
    <Svg onLayout={(event) => {
      setHeight(event.nativeEvent.layout.height);
      setWidth(event.nativeEvent.layout.width);
    }}>
      {width !== null && height !== null && (

        <>
          <VictoryPie
            animate={{ duration: 500 }}
            startAngle={0}
            height={height} width={width}
            data={state.data}
            radius={width/2 -40 }
            innerRadius={width/2 -35}
            labels={()=>{return null}}
            style={{
              data: {
                fill: ({ datum }) => {
                  const color = AppColors.primaryYellow;
                  return datum.x === 1 ? color : AppColors.SecondaryYellow;
                },
              },
            }}
          />

          <VictoryAnimation data={state}>
            {(newProps) => {
              return (
                <VictoryLabel
                  textAnchor={'middle'} verticalAnchor={'middle'}
                  y={height/2} x={width/2 }
                  text={state.percent === 100 ?  'FINISHED' : `${Math.round(state.percent)}%`}
                  style={{ fontSize: 45, fill: 'white' }}
                />
              );
            }}
          </VictoryAnimation>
        </>
      )}
    </Svg>
  );
}