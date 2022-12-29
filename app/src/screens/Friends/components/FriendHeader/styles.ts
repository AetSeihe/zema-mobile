import {StyleSheet} from 'react-native';
import {theme} from '../../../../styles/theme';


export const styles = StyleSheet.create({
  wrapper: {
    marginTop: 14,
    flexDirection: 'row',
    marginHorizontal: -4.5,
  },
  itemWrapper: {
    marginHorizontal: 4.5,
    flex: 1,
    backgroundColor: '#FFF',
    borderColor: theme.gray,
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 5,
  },
  activeItem: {
    backgroundColor: theme.main,
  },
  text: {
    textAlign: 'center',
    color: '#1E205A',
    fontWeight: '500',
  },
  activeText: {
    fontWeight: '500',
    color: '#fff',
  },
});
