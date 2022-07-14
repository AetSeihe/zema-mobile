import {StyleSheet} from 'react-native';
import {BASE_MARGIN_SCREEN} from '../../../constants/styles';
import {theme} from '../../../styles/theme';


export const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: BASE_MARGIN_SCREEN,
    marginVertical: BASE_MARGIN_SCREEN * 2,

    backgroundColor: theme.gray,
  },
  cart: {
    marginVertical: 10,
  },
  tint: {
    marginBottom: 10,
  },

  field: {
    marginBottom: 15,
  },
  multiField: {
    height: 200,
    flex: 1,
  },
  submitText: {
    color: '#fff',

  },
  submitContainer: {
    paddingVertical: 10,
  },

  imageWrapper: {
  },

  userImage: {
    width: 120,
    height: 120,
    backgroundColor: theme.gray,
    borderRadius: 15,
    marginRight: 10,
  },

  deleteImage: {
    position: 'absolute',
    top: 4,
    right: 14,
    elevation: 2,
    opacity: 0.6,
    borderRadius: 50,
  },
  userMainImage: {
    borderWidth: 2,
    borderColor: theme.main,
  },
  title: {
    marginBottom: 15,
  },
});
