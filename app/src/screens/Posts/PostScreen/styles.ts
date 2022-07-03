import {StyleSheet} from 'react-native';
import {theme} from '../../../styles/theme';


export const commentStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomColor: '#087BFF',
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  avatar: {
    marginRight: 12,
    width: 41,
    height: 41,
  },

  title: {
    fontWeight: '500',
    color: '#1E205A',
    marginBottom: 7,
    maxWidth: '100%',

  },

  text: {
    fontWeight: '300',
    color: '#1E205A',
    maxWidth: '100%',
  },

  delete: {
    fontSize: 12,
    color: theme.error,
    marginTop: 10,
  },
});

export const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
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
