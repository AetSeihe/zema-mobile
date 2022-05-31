import {StyleSheet} from 'react-native';
import {theme} from '../../styles/theme';


export const styles = StyleSheet.create({

  wrapper: {
    paddingTop: 100,
  },
  title: {
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 20,
  },
  content: {
    alignSelf: 'center',
    width: '90%',
    borderColor: '#CDCDCD',
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },

  logo: {
    width: 120,
    height: 120,
    marginTop: -110,
    marginBottom: 30,
    alignSelf: 'center',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  input: {
  },

  submitButton: {
    color: '#fff',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  registerItem: {
    alignSelf: 'center',
    marginBottom: 5,
    color: '#646464',
  },

  registerLink: {
    color: theme.main,
    textDecorationLine: 'underline',
  },
  userAgreementWrapper: {
    flexDirection: 'row',
  },

  userAgreementCheckbox: {
    marginBottom: 10,
    transform: [{
      scale: 0.8,
    }],
  },

  userAgreementText: {
    fontSize: 12,
  },
});
