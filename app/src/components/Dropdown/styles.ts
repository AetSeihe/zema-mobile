import {StyleSheet} from 'react-native';
import {BASE_MARGIN_SCREEN} from '../../constants/styles';


export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderRadius: BASE_MARGIN_SCREEN,
  },
});
