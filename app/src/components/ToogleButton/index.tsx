import React, {useEffect, useRef} from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import {ViewStyle} from 'react-native-material-ui';
import {styles} from './styles';

type Props = {
    value: boolean;
    onPress: () => void;
    wrapperStyle?: ViewStyle
}

const ToogleButton = ({value, onPress, wrapperStyle}:Props) => {
  const animatedCircle = useRef(new Animated.Value(0)).current;


  useEffect(()=> {
    Animated.timing(animatedCircle, {
      toValue: value ? 26: 4,
      useNativeDriver: true,
      duration: 100,
    }).start();
  }, [value]);


  return (
    <TouchableOpacity onPress={onPress} style={wrapperStyle}>
      <Animated.View style={[styles.wrapper, {
        backgroundColor: value ? '#009AFF': '#C8C8C8',
      }]}>
        <Animated.View style={[styles.toogle, {
          transform: [{
            translateX: animatedCircle,
          }],
        }]}/>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ToogleButton;
