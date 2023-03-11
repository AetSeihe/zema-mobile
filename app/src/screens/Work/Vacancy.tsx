import { Text } from '@react-native-material/core';
import { NavigationProp } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { Alert, Linking, Platform, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CustomButton from '../../components/CustomButton';
import Skill from '../../components/Skill';
import { VacancyOptionsType } from '../../types/routerTypes';
import { getPrefixToYears } from '../../utils/getPrefixToYears';
import { getNameByEmploymentType, getNameByWorkFormatType } from '../../utils/getTextByEnums';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { getVacancyHTML } from '../../utils/workToHtmlString';
import { routerStore } from '../../store/routerStore';
import { routerNames } from '../../constants/routerNames';
import { styles } from './styles';
import Share from 'react-native-share';


type Props = {
  navigation: NavigationProp<any>,
  route: {
    params: VacancyOptionsType
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

const Vacancy = ({ route, navigation }: Props) => {
  const vacancy = route.params.vacancy;


  const downloadPdf = async () => {
    try {
      const file = await RNHTMLtoPDF.convert({
        directory: 'Documents',
        html: getVacancyHTML(vacancy),
        fileName: vacancy.title,
        base64: Platform.OS === 'android',
      });

      if (file.filePath) {
        Share.open({
          title: vacancy.title,
          url: `file://${file.filePath}`,
        });
      }
    } catch (e: any) {
      Alert.alert(e.message);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: vacancy.title,
    });
  }, []);

  const goToCompanyWeb = () => {
    Linking.openURL(vacancy.companyUrl);
  };
  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.mainTitle}>{vacancy.title}</Text>
        <Text style={styles.salary}>{vacancy.minSalary}-{vacancy.maxSalary} руб.</Text>
        <Text style={styles.text}>{vacancy.description}</Text>
      </View>
      <View style={styles.card}>
        {vacancy.city && <Text style={styles.title}>{vacancy.city.title}</Text>}
        <View style={styles.specifications}>
          <Text style={styles.text}>
            <Text style={styles.bold}>Опыт работы:</Text>{' '}
            {vacancy.workExperience === 0 ? 'Не требуется' : `${vacancy.workExperience} ${getPrefixToYears(vacancy.workExperience)}`}
          </Text>
        </View>
        <View style={styles.specifications}>
          <Text style={styles.text}>
            <Text style={styles.bold}>Занятость:</Text> {getNameByEmploymentType(vacancy.employment)}
          </Text>
        </View>
        <View style={styles.specifications}>
          <Text style={styles.text}>
            <Text style={styles.bold}>Формат работы:</Text> {getNameByWorkFormatType(vacancy.workFormat)}
          </Text>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.title2}>Требования</Text>
        <Text style={styles.text}>{vacancy.requirement}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title2}>Обязанности</Text>
        <Text style={styles.text}>{vacancy.responsibilities}</Text>
      </View>
      {vacancy.skills.length !== 0 && (
        <View style={styles.card}>
          <Text style={styles.title2}>Навыки</Text>
          <View style={styles.skillWrapper}>{vacancy.skills.map((item) =>
            <Skill style={styles.skill} title={item.title} key={item.id} />)}
          </View>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.title2}>{vacancy.companyName}</Text>
        <Text style={styles.text}>{vacancy.descriptionCompany}</Text>
        <TouchableOpacity onPress={goToCompanyWeb}>
          <Text style={[styles.text, styles.bold]}>{vacancy.companyUrl}</Text>
        </TouchableOpacity>
      </View>
      <CustomButton style={styles.submitBtn} title='Откликнутся на вакансию' onPress={() => goToChat(vacancy.userId)} />
      <CustomButton theme='gray' title='Получить pdf' onPress={downloadPdf} />

    </ScrollView>
  );
};


export default Vacancy;
