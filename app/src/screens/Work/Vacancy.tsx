import {Text} from '@react-native-material/core';
import {NavigationProp} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {Alert, Linking, StyleSheet, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import CustomButton from '../../components/CustomButton';
import Skill from '../../components/Skill';
import {VacancyOptionsType} from '../../types/routerTypes';
import {getPrefixToYears} from '../../utils/getPrefixToYears';
import {getNameByEmploymentType, getNameByWorkFormatType} from '../../utils/getTextByEnums';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

type Props = {
  navigation: NavigationProp<any>,
  route: {
    params: VacancyOptionsType
  }
}


const Vacancy = ({route, navigation}: Props) => {
  const vacancy = route.params.vacancy;


  const downloadPdf = async () => {
    console.log('скачиваем блять');
    const options = {
      html: '<h1>PDF TEST</h1>',
      fileName: 'test',
      directory: 'Documents',
    };

    const file = await RNHTMLtoPDF.convert(options);
    if (file.filePath) {
      Linking.openURL(file.filePath);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: vacancy.title,
    });
  }, []);

  const goToCompanyWeb =() => {
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
        <Text style={styles.title}>{vacancy.city.title}</Text>
        <View style={styles.specifications}>
          <Text style={styles.text}>
            <Text style={styles.bold}>Опыт работы:</Text>{' '}
            {vacancy.workExperience === 0 ? 'Не требуется': `${vacancy.workExperience} ${getPrefixToYears(vacancy.workExperience)}`}
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
      <View style={styles.card}>
        <Text style={styles.title2}>Навыки</Text>
        <View style={styles.skillWrapper}>{vacancy.skills.map((item) =>
          <Skill style={styles.skill} title={item.title} key={item.id} />)}
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.title2}>{vacancy.companyName}</Text>
        <Text style={styles.text}>{vacancy.descriptionCompany}</Text>
        <TouchableOpacity onPress={goToCompanyWeb}>
          <Text style={[styles.text, styles.bold]}>{vacancy.companyUrl}</Text>
        </TouchableOpacity>
      </View>
      <CustomButton style={styles.submitBtn} title='Откликнутся на вакансию' />
      <CustomButton theme='gray' title='Получить pdf' onPress={downloadPdf}/>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 21,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 14,
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

export default Vacancy;
