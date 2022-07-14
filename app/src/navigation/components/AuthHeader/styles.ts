import {StyleSheet} from 'react-native';


export const styles = StyleSheet.create({
  wrapper: {

    overflow: 'visible',
    marginBottom: 62,
  },
  logoWrapper: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  logo: {
    width: 82,
    height: 82,
    marginBottom: -42,
    alignSelf: 'center',
  },
  circle1: {
    position: 'absolute',
    top: 20,
    left: -20,
    zIndex: -1,
  },
  circle2: {
    position: 'absolute',
    top: 20,
    right: -20,
    zIndex: -1,
  },

});
