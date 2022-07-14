import {Text} from '@react-native-material/core';
import React from 'react';
import {FlatList, ListRenderItemInfo, View} from 'react-native';
import {Avatar} from '../../../../components/Avatar';
import {Card} from '../../../../components/Card';
import Icon from '../../../../components/Icon';
import {TextBlock} from '../../../../components/TextBlock';
import {Title} from '../../../../components/Title';
import {FileModule} from '../../../../models/FileModule';
import {Post} from '../../../../models/Post';
import {User} from '../../../../models/User';
import {theme} from '../../../../styles/theme';
import {styles} from './styles';

type Props = {
    user: User;
    posts: Post[];
    renderProfileButtons: (user: User) => JSX.Element;
    renderPhoto: (image: ListRenderItemInfo<FileModule>) => JSX.Element
}

export const ProfileHeader = ({user, renderProfileButtons, renderPhoto}: Props) => {
  return (
    <View style={styles.wrapper}>
      <Card style={styles.content}>
        <Avatar style={styles.avatar} image={user.mainPhoto?.image}/>
        <Text style={styles.fullName}>{user.fullName}</Text>
        {(user.birthCity || user.currentCity) && (
          <View style={styles.cities}>
            <Text style={styles.city}>{user.birthCity?.title}</Text>
            <Icon name='arrow-right2' size={16} color={theme.main}/>
            <Text style={[styles.city, styles.currentCity]}>{user.currentCity?.title}</Text>
          </View>
        )}
        <Text style={styles.fieldWrapper}><Text style={styles.fieldTitle}>Пол:</Text>{user.nameOfGender}</Text>
        <Text style={styles.fieldWrapper}><Text style={styles.fieldTitle}>Возраст:</Text> {user.age}</Text>
        <Text style={styles.fieldWrapper}><Text style={styles.fieldTitle}>Образование: </Text>{user.nameOfEducation}</Text>
        {!!user.interesting && <TextBlock style={styles.muiltiField} title='Интересы' text={user.interesting}/>}
        {!!user.work && <TextBlock style={styles.muiltiField} title='Работа' text={user.work}/>}
        {!!user.howCanHelp && <TextBlock style={styles.muiltiField} title='Чем могу помочь' text={user.howCanHelp}/>}
        {!!user.needHelp && <TextBlock style={styles.muiltiField} title='Нужна помощь' text={user.needHelp}/>}
      </Card>
      {renderProfileButtons(user)}
      {!!user.images.length && (
        <Card style={styles.content}>
          <Title style={styles.counterTitleWrapper}>Всего фотографий: {user.images.length}</Title>
          <FlatList
            horizontal
            data={user.images}
            renderItem={renderPhoto}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      )}
    </View>
  );
};
