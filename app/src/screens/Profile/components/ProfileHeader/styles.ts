import {StyleSheet} from 'react-native';
import {BASE_MARGIN_SCREEN} from '../../../../constants/styles';
import {theme} from '../../../../styles/theme';


export const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: BASE_MARGIN_SCREEN,
  },
  content: {
    marginVertical: 10,
  },
  avatar: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    marginBottom: 15,
    backgroundColor: theme.gray,
    borderWidth: 2,
    borderColor: theme.gray,
  },
  fullName: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  cities: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  city: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  currentCity: {
    color: theme.main,
    fontWeight: '500',
  },
  fieldWrapper: {},
  fieldTitle: {
    fontWeight: '500',
    fontSize: 18,
  },

  photosWrapper: {
    marginTop: 15,
  },
  photosText: {},
  muiltiField: {},
  counterTitleWrapper: {},
});
