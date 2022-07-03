import {StyleSheet} from 'react-native';
import {theme} from '../../../../styles/theme';


export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: theme.gray,
  },
  avatar: {
    marginRight: 20,
    width: 69,
    height: 69,
    borderRadius: 80,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  message: {
    color: '#909090',
    fontSize: 15,
    fontWeight: '300',
    maxWidth: '85%',
  },
  column: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  time: {
    fontSize: 14,
    color: '#909090',
  },
  row: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notRead: {
    width: 20,
    height: 20,
    backgroundColor: theme.main,
    borderRadius: 20,
  },
});
