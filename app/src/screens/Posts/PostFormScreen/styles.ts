import {StyleSheet} from 'react-native';


export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 15,

  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  multiInputWrapper: {
    flex: 1,
  },

  inputWrapper: {
    flex: 1,

  },
  multiInput: {
    minHeight: '90%',
  },
  charCount: {
    textAlign: 'right',
    fontSize: 15,
    color: 'gray',
  },
  submit: {
    marginTop: 8,
    paddingVertical: 10,
  },
  submitText: {
    color: '#fff',
  },

  imageContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: -10,
    maxHeight: 120,
  },
  imagesContentContainer: {
    alignItems: 'center',
  },
  imageWrapper: {
    marginHorizontal: 10,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  imageDelete: {
    position: 'absolute',
    right: -5,
    top: -5,
  },
});
