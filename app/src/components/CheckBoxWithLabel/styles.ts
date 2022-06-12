import {StyleSheet} from 'react-native';


export const styles = StyleSheet.create({
  userAgreementWrapper: {
    flexDirection: 'row',
  },
  userAgreementCheckbox: {
    transform: [{
      scale: 0.8,
    }],
  },

  userAgreementText: {
    fontSize: 17,
    alignSelf: 'center',
    marginBottom: 7,
  },
});
