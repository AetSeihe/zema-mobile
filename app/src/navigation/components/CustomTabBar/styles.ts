import {StyleSheet} from 'react-native';


export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  icon: {
    alignSelf: 'center',
  },
  label: {
    textAlign: 'center',
  },
  plusWrapper: {
    position: 'relative',
    top: -25,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,

    elevation: 5,
  },

  menuItem: {
    fontWeight: '500',
  },
});
