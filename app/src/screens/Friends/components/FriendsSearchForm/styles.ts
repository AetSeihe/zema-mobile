import {StyleSheet} from 'react-native';
import {BASE_MARGIN_SCREEN} from '../../../../constants/styles';
import {theme} from '../../../../styles/theme';


export const styles = StyleSheet.create({
  wrapper: {
    marginTop: 15,
    paddingVertical: 25,
    marginHorizontal: BASE_MARGIN_SCREEN,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },

  field: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  age: {
    flex: 1,
  },
  submitWrappers: {
    paddingVertical: 6,
    marginBottom: 10,
  },
  submit: {
    color: '#fff',
  },
  reset: {
    color: theme.main,
    fontWeight: '300',
    marginLeft: 6,
  },
});
