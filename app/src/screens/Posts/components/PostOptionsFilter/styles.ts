import {StyleSheet} from 'react-native';
import {theme} from '../../../../styles/theme';


export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {},
  citiesWrapper: {
    flexDirection: 'row',
  },
  inputCity: {
    flex: 1,
  },
  sort: {
    marginBottom: 10,
  },
  sortSelected: {
    fontWeight: '500',
    color: theme.main,
  },

  buttonText: {
    color: '#fff',
  },
});
