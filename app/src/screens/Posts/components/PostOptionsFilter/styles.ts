import {StyleSheet} from 'react-native';
import {BASE_MARGIN_SCREEN} from '../../../../constants/styles';
import {theme} from '../../../../styles/theme';


export const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    marginHorizontal: BASE_MARGIN_SCREEN,
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
