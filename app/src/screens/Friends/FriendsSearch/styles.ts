import {StyleSheet} from 'react-native';
import {BASE_MARGIN_SCREEN} from '../../../constants/styles';
import {theme} from '../../../styles/theme';


export const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-start',
    marginHorizontal: BASE_MARGIN_SCREEN,
  },
  cardWrapper: {
    height: '100%',
  },
  card: {
    flex: 1,
    marginBottom: 10,
  },
  buttonsWrapper: {
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
  },
  buttonContainer: {
    flex: 1,
  },
  appendFriendButton: {
    backgroundColor: theme.main,
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    borderRadius: 5,
    marginLeft: 5,
  },
});
