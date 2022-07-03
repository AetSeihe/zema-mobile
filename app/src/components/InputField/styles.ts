import {StyleSheet} from 'react-native';
import {globalBorderRadius} from '../../styles/styles';
import {theme} from '../../styles/theme';


export const styles = StyleSheet.create({
  error: {
    color: theme.error,
    fontSize: 12,
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: globalBorderRadius,
  },
});
