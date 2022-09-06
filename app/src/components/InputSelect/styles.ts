import {StyleSheet} from 'react-native';
import {theme} from '../../styles/theme';


export const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    overflow: 'visible',
  },
  optionsWrapper: {
    width: '100%',
    maxHeight: 150,
    backgroundColor: '#fff',
    elevation: 2,
    zIndex: 5,
    overflow: 'hidden',
  },
  option: {

    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: theme.gray,
  },
  optionText: {},
});
