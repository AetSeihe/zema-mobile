import {StyleSheet} from 'react-native';
import {theme} from '../../styles/theme';


export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  writeButtonWrapper: {
    flex: 1,
    marginRight: 5,
    width: 10,
  },
  writeButtonText: {
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: theme.error,
    borderRadius: 5,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  normalButton: {
    backgroundColor: theme.main,
    borderRadius: 5,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
