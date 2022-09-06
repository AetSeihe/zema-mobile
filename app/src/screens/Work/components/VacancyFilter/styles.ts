import {StyleSheet} from 'react-native';
import {BASE_MARGIN_SCREEN} from '../../../../constants/styles';


export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
    marginHorizontal: BASE_MARGIN_SCREEN,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -5,

  },
  field: {
    marginBottom: 10,
  },
  inputRow: {
    flex: 1,
    margin: 5,
  },


  submitTitle: {
    color: '#fff',
  },
});
