import {StyleSheet} from 'react-native';
import {BASE_MARGIN_SCREEN} from '../../../constants/styles';
import {theme} from '../../../styles/theme';


export const styles = StyleSheet.create({
  leftAcctionWrapper: {
    height: '100%',
    width: 200,
    marginRight: -10,
    backgroundColor: '#087BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftActionBlock: {
    backgroundColor: '#838383b3',
  },
  leftAcctionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  wrapper: {
    flex: 1,
    marginHorizontal: BASE_MARGIN_SCREEN,
  },
  cardWrapper: {
    marginTop: 5,
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

  earthWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 11,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  earthText: {
    fontSize: 19,
    fontWeight: '500',
  },
  earthIcon: {
    width: 33,
    height: 33,
  },
});
