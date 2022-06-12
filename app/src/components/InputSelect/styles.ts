import {StyleSheet} from 'react-native';
import {theme} from '../../styles/theme';


export const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    overflow: 'visible',
  },
  optionsWrapper: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    height: 150,
    backgroundColor: '#fff',

  },
  option: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: theme.gray,
  },
  optionText: {},
});
