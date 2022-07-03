import {StyleSheet} from 'react-native';
import {theme} from '../styles/theme';


export const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    right: -5,
    top: -5,
    width: 15,
    height: 15,
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 2,
    backgroundColor: theme.main,
  },
  headerIcon: {
    marginRight: 10,
  },
  menuItem: {
    fontWeight: '500',
  },
  menuItemExit: {
    color: theme.error,
    fontWeight: '500',
  },
});
