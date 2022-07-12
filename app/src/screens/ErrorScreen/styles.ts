import {StyleSheet} from 'react-native';


export const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 80,
    flex: 1,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 40,
  },
  content: {
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    color: '#1E205A',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 9,
  },
  text: {
    color: '#1E205A',
    textAlign: 'center',
    marginBottom: 35,
  },
  wrapperButton: {
    paddingVertical: 10,
  },
  button: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  circleOne: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },

  circleTwo: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});
