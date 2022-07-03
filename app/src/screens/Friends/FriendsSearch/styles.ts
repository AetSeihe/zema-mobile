import {StyleSheet} from 'react-native';
import {BASE_MARGIN_SCREEN} from '../../../constants/styles';
import {theme} from '../../../styles/theme';


export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  cardWrapper: {
    paddingTop: BASE_MARGIN_SCREEN,
    marginHorizontal: BASE_MARGIN_SCREEN,

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
  tint: {
    marginTop: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
});
