import {Button, Text} from '@react-native-material/core';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ViewStyle} from 'react-native-material-ui';
import {Avatar} from '../../../../components/Avatar';
import {Card} from '../../../../components/Card';
import {Title} from '../../../../components/Title';
import {routerNames} from '../../../../constants/routerNames';
import {Vacancy} from '../../../../models/Vacancy';
import {routerStore} from '../../../../store/routerStore';
import {theme} from '../../../../styles/theme';
import {optionRowStyles, styles} from './styles';

type Props = {
    onPressCard: (vacancy: Vacancy) => void;
    data: Vacancy,
    wrapperStyle?: ViewStyle,
}


type OptionRowType = {
  title: string,
  description: string,
}

const OptionRow = ({title, description}: OptionRowType) => {
  return (
    <View style={optionRowStyles.wrapper}>
      <Text style={optionRowStyles.title}>{title}</Text>
      <Text>{description}</Text>
    </View>
  );
};


const VacantyItem = ({data, wrapperStyle}: Props) => {
  const user = data.user;

  const onPressAvatar = () => {
    routerStore.pushToScene({
      name: routerNames.PROFILE,
      options: {
        user: user,
      },
    });
  };

  const onPressChat = () => {
    routerStore.tabBarNavigatorGoTo({
      name: routerNames.Chat,
      options: {
        user: user,
      },
    });
  };


  return (
    <Card style={[styles.wrapper, wrapperStyle]}>
      <TouchableOpacity style={styles.avatarWrapper} onPress={onPressAvatar}>
        <Avatar image={user.mainPhoto?.image} style={styles.avatar}/>
        <View >
          <Text style={styles.name}>{user.fullName}</Text>
          <Text style={styles.city}>{data.city.title}</Text>
        </View>
      </TouchableOpacity>
      <Title style={styles.title}>{data.id} {data.title}</Title>
      <View style={styles.title}>
        <OptionRow title='Опыт работы:' description={`${data.workExperience} года`}/>
        <OptionRow title='Зарплата:' description={`${data.salary} рублей`}/>
      </View>
      <Text style={styles.description}>{data.description}</Text>
      <View style={styles.title}>
        <OptionRow title='Номер для связи:' description={`${data.phone}`}/>
        <OptionRow title='E-mail для связи:' description={`${data.email}`}/>
      </View>
      <Button title='Написать' color={theme.main} titleStyle={styles.textButton} onPress={onPressChat}/>
    </Card>
  );
};

export default VacantyItem;
