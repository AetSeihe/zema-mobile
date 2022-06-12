import {StyleSheet} from 'react-native';
import {theme} from '../../../styles/theme';


export const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 5,
  },

  text: {
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 500,
    backgroundColor: theme.gray,
    marginBottom: 20,
  },
  commentForm: {
    borderTopColor: theme.main,
    borderTopWidth: 2,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
