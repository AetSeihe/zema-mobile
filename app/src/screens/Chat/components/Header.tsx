import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, {FadeIn, FadeInDown, FadeOut, FadeOutUp} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Skeleton, SkeletonContainer} from 'react-native-skeleton-component';
import {Avatar} from '../../../components/Avatar';
import Icon from '../../../components/Icon';
import {FileModule} from '../../../models/FileModule';
import {theme} from '../../../styles/theme';


type Props = {
    fullName?: string;
    img: FileModule | undefined,
    onPressBack: () => void,
    loading: boolean,
}

const Header = ({fullName, loading, img, onPressBack}:Props) => {
  return (
    <SafeAreaView edges={['top']}>
      <View style={styles.wrapper}>
        <SkeletonContainer backgroundColor={theme.skeleton} highlightColor={theme.highlightSceleton}>
          <TouchableOpacity style={styles.backBtn} onPress={onPressBack}>
            <Icon name='ctrl' color={theme.main} size={50}/>
          </TouchableOpacity>
          {!loading ? (
            <Animated.View entering={FadeInDown} exiting={FadeOutUp} style={styles.skeletonContent}>
              <Text style={styles.name}>{fullName}</Text>
            </Animated.View>
         ): (
            <Animated.View entering={FadeInDown} exiting={FadeOutUp} style={styles.skeletonContent}>
              <Skeleton style={styles.skeletonName}/>
              <Skeleton style={styles.skeletonLastName}/>
            </Animated.View>
         )}
          {!loading ? (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <Avatar image={img} style={styles.avatar}/>
            </Animated.View>
          ): (
           <Animated.View entering={FadeIn} exiting={FadeOut}>
             <Skeleton style={styles.avatar}/>
           </Animated.View>
         )}

        </SkeletonContainer>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: theme.gray,
  },
  name: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '500',
  },
  skeletonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  skeletonName: {
    height: 20,
    width: 80,
    marginRight: 10,
    color: 'red',
  },
  skeletonLastName: {
    height: 20,
    width: 140,
  },
  backBtn: {
    transform: [{
      rotate: '-90deg',
    }],
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 70,
  },
});

export default Header;
