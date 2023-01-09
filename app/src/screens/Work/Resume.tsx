import {Text} from '@react-native-material/core';
import {NavigationProp} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {Alert, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import CustomButton from '../../components/CustomButton';
import Skill from '../../components/Skill';
import {routerNames} from '../../constants/routerNames';
import {routerStore} from '../../store/routerStore';
import {ResumeOptionsType} from '../../types/routerTypes';
import {getPrefixToYears} from '../../utils/getPrefixToYears';
import {getNameByEmploymentType, getNameByWorkFormatType} from '../../utils/getTextByEnums';
import {getHtmlResume} from '../../utils/workToHtmlString';
import {styles} from './styles';
import Share from 'react-native-share';

type Props = {
  navigation: NavigationProp<any>,
  route: {
    params: ResumeOptionsType
  }
}

const goToChat = (userId: number) => {
  routerStore.pushToScene({
    name: routerNames.Chat_Item,
    options: {
      userId: userId,
    },
  });
};

const Resume = ({navigation, route}:Props) => {
  const resume = route.params.resume;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: resume.title,
    });
  }, []);

  const downloadPdf = async () => {
    try {
      const file = await RNHTMLtoPDF.convert({
        html: getHtmlResume(resume),
        fileName: resume.title,
        width: 340,
      });
      if (file.filePath) {
        Share.open({
          title: resume.title,
          url: `file://${file.filePath}`,
        });
      }
    } catch (e: any) {
      Alert.alert(e.message);
    }
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.mainTitle}>{resume.title}</Text>
        <Text style={styles.salary}>{resume.salary} руб.</Text>
        <Text style={styles.text}>{resume.description}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>{resume.city.title}</Text>
        <View style={styles.specifications}>
          <Text style={styles.text}>
            <Text style={styles.bold}>Опыт работы:</Text>{' '}
            {resume.workExperience === 0 ? 'Не требуется': `${resume.workExperience} ${getPrefixToYears(resume.workExperience)}`}
          </Text>
        </View>
        <View style={styles.specifications}>
          <Text style={styles.text}>
            <Text style={styles.bold}>Занятость:</Text> {getNameByEmploymentType(resume.employment)}
          </Text>
        </View>
        <View style={styles.specifications}>
          <Text style={styles.text}>
            <Text style={styles.bold}>Формат работы:</Text> {getNameByWorkFormatType(resume.workFormat)}
          </Text>
        </View>
      </View>
      {resume.resumeSkills.length !== 0 && (
        <View style={styles.card}>
          <Text style={styles.title2}>Навыки</Text>
          <View style={styles.skillWrapper}>{resume.resumeSkills.map((item) =>
            <Skill style={styles.skill} title={item.title} key={item.id} />)}
          </View>
        </View>)}

      <CustomButton style={styles.submitBtn} title='Откликнутся на вакансию' onPress={() => goToChat(resume.userId)}/>
      <CustomButton theme='gray' title='Получить pdf' onPress={downloadPdf}/>
    </ScrollView>
  );
};

export default Resume;
