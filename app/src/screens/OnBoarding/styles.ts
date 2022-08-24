import {StyleSheet} from 'react-native';


export const styles = StyleSheet.create({
  elipse1: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  elipse2: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  geoIcon: {
    marginTop: 160,
    alignSelf: 'center',
    marginBottom: 34,
    width: 125,
    height: 125,
  },
  title: {
    textAlign: 'center',
    maxWidth: 317,
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 35,
  },
  buttonWrapper: {
    backgroundColor: 'rgba(8, 123, 255, 0.7)',
    alignSelf: 'center',
    width: '90%',
    marginBottom: 11,
    paddingVertical: 17,
    marginHorizontal: 500,
  },
  buttonWrapperReject: {
    backgroundColor: 'rgba(255, 8, 8, 0.7)',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff',
    fontSize: 14,
  },
});
