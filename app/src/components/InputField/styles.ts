import {StyleSheet} from 'react-native';
import {theme} from '../../styles/theme';


export const styles = StyleSheet.create({
  error: {
    color: theme.error,
    fontSize: 12,
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderColor: '#087BFF',
    color: '#000',
    fontSize: 14,
    textAlignVertical: 'center',
  },
  disabled: {
    opacity: 0.7,
    borderColor: 'transparent',
  },
});
