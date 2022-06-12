import {StyleSheet} from 'react-native';
import {theme} from '../../../../../styles/theme';


export const styles = StyleSheet.create({
  wrapper: {
    width: 130,
    height: 130,
    padding: 10,
    backgroundColor: theme.gray,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    opacity: 0.7,
  },
});
