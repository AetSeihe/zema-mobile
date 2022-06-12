import {StyleSheet} from 'react-native';
import {theme} from '../../../../styles/theme';


export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 5,
  },
  getAllLink: {
    color: theme.main,
  },
  text: {
    fontWeight: '300',
    fontSize: 14,
    marginBottom: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 500,
    backgroundColor: theme.gray,
  },
  imageText: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: theme.gray,
    opacity: 0.7,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userWrapper: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 9,
    marginRight: 12,
    backgroundColor: 'red',
  },
  userName: {
    fontWeight: '500',
    fontSize: 15,
    color: '#1E205A',
  },
  createdDate: {
    fontSize: 14,
    color: '#8F89A0',
  },

  events: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  comments: {
    width: 28,
    height: 28,
    marginLeft: 15,
  },
});
