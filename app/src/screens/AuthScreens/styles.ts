import {StyleSheet} from 'react-native';
import {theme} from '../../styles/theme';


export const styles = StyleSheet.create({

  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    color: theme.main,
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 18,
  },
  content: {
    alignSelf: 'center',
    width: '85%',
  },

  logo: {
    width: 120,
    height: 120,
    marginTop: -110,
    marginBottom: 30,
    alignSelf: 'center',
  },
  inputWrapper: {
    marginBottom: 13,
  },
  input: {
  },

  submitButton: {
    color: '#fff',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  registerItem: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#646464',
  },

  registerLink: {
    color: theme.main,
    textDecorationLine: 'underline',
  },
  userAgreementWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,

  },

  userAgreementCheckbox: {
    marginRight: 8,
  },

  userAgreementText: {
    fontSize: 12,
    flex: 1,
  },

  bgImage: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    borderRadius: 20,
  },
});
