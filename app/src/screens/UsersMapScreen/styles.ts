import {StyleSheet} from 'react-native';


export const userProfileStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 27,
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    marginBottom: 23,

  },
  image: {
    width: 91,
    height: 100,
    marginRight: 16,
  },
  fullname: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
    color: '#1E205A',
  },
  gender: {
    fontSize: 14,
    color: '#1E205A',

  },
  education: {
    fontSize: 14,
    color: '#1E205A',
  },
});

export const styles = StyleSheet.create({
  mapIconWrapper: {
    position: 'absolute',
    right: 12,
    backgroundColor: '#fff',
    width: 52,
    height: 52,
    borderRadius: 100,
    padding: 6,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapIcon: {
    width: '100%',
    height: '100%',
  },
  mapToUserIconWrapper: {
    bottom: '20%',
  },
  mapPlusIconWrapper: {
    bottom: '40%',
  },
  mapMinusIconWrapper: {
    bottom: '50%',
  },
  ellipseIcon: {
    position: 'absolute',
    bottom: -150,
    right: -150,
    zIndex: -1,
  },
  goBackWrapper: {
    zIndex: 10,
    padding: 10,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 50,

  },
  goBackImage: {
    width: 20,
    height: 25,
  },
  settingsIconWrapper: {
    padding: 10,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 50,
  },
  settingsIconImage: {
    width: 20,
    height: 25,
  },

  tabBarWrapper: {
    width: '100%',
    position: 'absolute',
    zIndex: 50,
  },
  tabBarButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  settings: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
});
