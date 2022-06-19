import {StyleSheet} from 'react-native';
import {theme} from '../../../../styles/theme';


export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  itemWrapper: {
    flex: 1,
    backgroundColor: '#FFF',
    borderColor: theme.gray,
    borderWidth: 1,
    paddingVertical: 14,
  },
  activeItem: {
    backgroundColor: theme.main,
  },
  text: {
    textAlign: 'center',
  },
  activeText: {
    fontWeight: '500',
    color: '#fff',
  },
});
