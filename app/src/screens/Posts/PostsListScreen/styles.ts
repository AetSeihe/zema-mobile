import {StyleSheet} from 'react-native';
import {theme} from '../../../styles/theme';


export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.gray,
  },
  content: {
    flex: 1,
  },
  postWrapper: {
    width: '95%',
    alignSelf: 'center',
  },
  post: {
    marginTop: 20,
  },
  form: {
    marginBottom: 10,
  },

  tint: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 35,
  },
});
