import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';


const ChatListHeader = ({...props}: TextInputProps) => {
  return (
    <View style={[styles.wrapper] }>
      <TextInput style={styles.search} {...props}/>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  search: {
    textAlign: 'center',
    color: '#000',
  },
});

export default ChatListHeader;
