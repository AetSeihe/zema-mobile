import {StyleSheet} from 'react-native';


export const settingsItemStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 11,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  image: {
    width: 30,
    height: 30,

  },
  text: {},
});

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#E5E5E5',
    paddingTop: 20,
    flex: 1,
  },
  ellipseIcon: {
    position: 'absolute',
    bottom: -100,
    right: -100,
    zIndex: -1,
    width: 585,
    height: 585,
  },
});
