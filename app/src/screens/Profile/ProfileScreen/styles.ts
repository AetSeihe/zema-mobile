import {StyleSheet} from 'react-native';
import {BASE_MARGIN_SCREEN} from '../../../constants/styles';

export const styles = StyleSheet.create({
  postWrapper: {
    marginHorizontal: BASE_MARGIN_SCREEN,
    marginBottom: 20,
  },
  buttonWrapper: {
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 15,
    marginRight: 10,
  },
});
