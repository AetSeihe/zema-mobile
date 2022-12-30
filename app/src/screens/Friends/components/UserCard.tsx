import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Swipeable, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Avatar} from '../../../components/Avatar';
import {FileModule} from '../../../models/FileModule';
import {getPrefixToYears} from '../../../utils/getPrefixToYears';


type Props = {
    photo: FileModule | undefined;
    title: string;
    gender: string;
    education: string;
    dateOfBirth: string;
    age: number;
    onPressCard?: () => void;
    renderLeftComponent: () => React.ReactNode;
    renderRightComponent: () => React.ReactNode
}
const UserCard = ({photo, title, gender, education, dateOfBirth, age, onPressCard, renderLeftComponent, renderRightComponent}:Props) => {
  return (
    <Swipeable renderLeftActions={renderLeftComponent} renderRightActions={renderRightComponent}>
      <TouchableWithoutFeedback onPress={onPressCard} style={styles.wrapper}>
        <Avatar style={styles.avatar} image={photo}/>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          {!!age && <Text style={styles.text}>{dateOfBirth} <Text style={styles.gray}>({age} {getPrefixToYears(age)})</Text></Text>}
          {!!gender && <Text style={styles.text}>{gender}</Text>}
          {!!education && <Text style={styles.text}>{education || ''}</Text>}
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 21,
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  content: {
    marginLeft: 16,
  },
  avatar: {
    width: 91,
    height: 104,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1E205A',
    marginBottom: 8,
  },
  text: {
    color: '#1E205A',
    marginBottom: 5,
  },
  gray: {
    color: '#646464',
  },
});

export default UserCard;
