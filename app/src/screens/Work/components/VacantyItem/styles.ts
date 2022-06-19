import {StyleSheet} from 'react-native';


export const optionRowStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export const styles = StyleSheet.create({
  wrapper: {
  },
  avatarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    marginRight: 15,
    width: 56,
    height: 56,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  city: {
    color: 'gray',
  },
  date: {},
  title: {
    marginBottom: 10,
  },
  description: {
    marginBottom: 15,
  },

  textButton: {
    color: '#fff',
  },
});
