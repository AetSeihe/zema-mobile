import {StyleSheet} from 'react-native';


export const toobleBtnStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  content: {},
  title: {
    fontSize: 14,
    color: '#071838',
  },

  tint: {
    color: 'rgba(7, 24, 56, 0.51)',
    fontSize: 10,
    maxWidth: 200,
  },
});


export const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 21,
    marginVertical: 20,
  },
  title: {
    fontWeight: '600',
    color: '#071838',
    fontSize: 15,
    marginBottom: 14,
  },
  ellipseIcon: {
    position: 'absolute',
    bottom: -200,
    right: -200,
    zIndex: -1,
  },
});

