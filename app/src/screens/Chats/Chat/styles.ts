import {StyleSheet} from 'react-native';
import {theme} from '../../../styles/theme';

export const stylesHeader = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    padding: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 60,
    marginRight: 14,
  },
  title: {
    fontSize: 18,
  },
});


export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
    paddingHorizontal: 15,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  button: {
    backgroundColor: theme.main,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 13,
    borderRadius: 50,
  },
  buttonDisabled: {
    opacity: 0.3,
  },
});


export const stylesMessage = StyleSheet.create({
  wrapper: {
    alignSelf: 'flex-end',
    backgroundColor: '#E2EFFF',
    paddingVertical: 24,
    paddingHorizontal: 12,
    marginBottom: 10,
    maxWidth: '80%',
    minWidth: '25%',

    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 15,
  },
  text: {
    color: '#3A3A3A',
    fontWeight: '300',
    fontSize: 16,
    maxWidth: '100%',
  },
  companionCompanion: {
    color: '#fff',
  },

  wrapperCompanion: {
    backgroundColor: theme.main,
    alignSelf: 'flex-start',
  },

  row: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  timeCompanion: {
    color: '#7CB9FF',

  },
  time: {
    color: '#087BFF',
    fontSize: 12,
    marginRight: 5,
  },
  checkmarkReaded: {
    position: 'relative',
    left: -5,
  },

});
