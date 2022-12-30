import {StyleSheet} from 'react-native';
import {BASE_MARGIN_SCREEN} from '../../constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 21,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginVertical: 7,
    paddingVertical: 19,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 5,
  },
  mainTitle: {
    color: '#087BFF',
    fontWeight: '600',
    fontSize: 24,
    marginBottom: 5,
  },
  specifications: {
    marginBottom: 6,
  },
  salary: {
    fontWeight: '500',
    fontSize: 17,
    marginBottom: 10,
  },
  title: {
    color: '#071838',
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 15,
  },
  bold: {
    fontWeight: '500',
    fontSize: 14,
    color: '#071838',
  },
  text: {
    color: '#071838',
    fontSize: 14,
  },
  title2: {
    color: '#087BFF',
    fontWeight: '600',
    marginBottom: 10,
  },
  skillWrapper: {
    margin: -5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    margin: 5,
  },
  submitBtn: {
    marginVertical: 10,
  },
});


export const formStyles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: BASE_MARGIN_SCREEN,
  },
  card: {
    paddingTop: 20,
    paddingHorizontal: 12,
    paddingBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 5,
    marginVertical: 7,

  },
  inputField: {
    marginBottom: 15,
  },
  inputMulti: {
    height: 200,
  },
  title: {
    color: '#1E205A',
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
  },
  salary: {
    flex: 1,
  },
  salaryMin: {
    marginRight: 10,
  },
  submit: {
    marginBottom: 25,
  },
  skillWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
    marginBottom: 10,
  },
  skill: {
    margin: 2.5,
  },
});
