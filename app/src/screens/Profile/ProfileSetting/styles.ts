import {StyleSheet} from 'react-native';
import {BASE_MARGIN_SCREEN} from '../../../constants/styles';
import {theme} from '../../../styles/theme';


export const styles = StyleSheet.create({
  wrapper: {

    backgroundColor: theme.gray,
  },
  content: {
    marginHorizontal: BASE_MARGIN_SCREEN,
    paddingVertical: BASE_MARGIN_SCREEN * 2,

  },

  cart: {
    marginVertical: 7,
  },
  tint: {
    marginTop: 16,
    fontSize: 10,
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
    width: 133,
    height: 133,
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
    marginBottom: 20,
    color: '#1E205A',
  },

  userDate: {
    borderColor: '#087BFF',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 10,
  },

  ellipseIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: -1,
  },
});
