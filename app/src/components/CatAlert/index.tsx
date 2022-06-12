import {Text} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {styles} from './styles';


type Props = {
  title: string
}

const catsArr = ['(Φ ω Φ)', '(ꏿ ω ꏿ)', '( ⓛ ω ⓛ *)'];

export const CatAlert = ({title}: Props) => {
  const [cat, setCat] = useState('');

  useEffect(()=> {
    setCat(catsArr[Math.floor(Math.random() * (catsArr.length - 1))]);
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.cat}>{cat}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
