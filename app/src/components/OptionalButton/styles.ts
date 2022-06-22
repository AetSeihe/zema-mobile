import {StyleSheet} from 'react-native';
import {theme} from '../../styles/theme';


export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: theme.main,
    marginBottom: 1,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
});
