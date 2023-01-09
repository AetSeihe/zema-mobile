import {Text} from '@react-native-material/core';
import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {FadeInDown, FadeOutDown, Layout} from 'react-native-reanimated';
import CustomButton from '../../components/CustomButton';
import {InputField} from '../../components/InputField';
import InputSelect from '../../components/InputSelect';
import Skill from '../../components/Skill';
import {cityServices} from '../../services/cityServices';
import {CityType} from '../../types/userTypes';
import {formStyles} from './styles';
import * as yup from 'yup';
import {locale} from '../../locale';
import {EmploymentType, WorkFormatType} from '../../types/workTypes';
import {Formik} from 'formik';
import {workStore} from '../../store/workStore';
import {NavigationProp} from '@react-navigation/core';
import {routerStore} from '../../store/routerStore';
import {routerNames} from '../../constants/routerNames';


const SKILLS_ARR = ['Дизайн', 'Верстка', 'Программирование', 'Парикмахер'];

type SelectToEmployment = {
  title: string;
  value: EmploymentType
}

type SelectToWorkType = {
  title: string;
  value: WorkFormatType
}

const typeOfEmployment: SelectToEmployment[] = [{
  title: 'Весь день',
  value: 'fulltime',
}, {
  title: 'Неполный день',
  value: 'partTime'}];

const typeOfWork: SelectToWorkType[] = [
  {
    title: 'Гибридная',
    value: 'hybrid',
  },
  {
    title: 'Офис',
    value: 'office',
  },
  {
    title: 'Удаленка',
    value: 'remote',
  },
];

const initalValues = {
  title: '',
  minSalary: 0,
  maxSalary: 0,
  workExperience: 0,
  description: '',
  city: '',
  skills: [],
  employment: 'Удаленка',
  workFormat: 'Офис',
  requirement: '',
  responsibilities: '',
  companyName: '',
  descriptionCompany: '',
  companyUrl: '',
};

const schema = yup.object({
  title: yup.string().required(locale.fields.required),
  description: yup.string().required(locale.fields.required),
  employment: yup.string().oneOf(typeOfEmployment.map((item) => item.title), 'Выбирите из ниже перечисленного списка').required(locale.fields.required),
  workFormat: yup.string().oneOf(typeOfWork.map((item) => item.title), 'Выбирите из ниже перечисленного списка').required(locale.fields.required),
  requirement: yup.string().required(locale.fields.required),
  responsibilities: yup.string().required(locale.fields.required),
  companyName: yup.string().required(locale.fields.required),
  descriptionCompany: yup.string().required(locale.fields.required),
  companyUrl: yup.string().required(locale.fields.required),
  minSalary: yup.number().required(locale.fields.required),
  maxSalary: yup.number().required(locale.fields.required),
  workExperience: yup.number().required(locale.fields.required),
});

type Props = {
  navigation: NavigationProp<any>
}

const VacancyForm = ({navigation}:Props) => {
  const [cities, setCities] = useState<CityType[]>([]);

  const [skillValue, setSkillValue] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const getCitiesByName = async (name: string) => {
    if (name.length < 2 ) {
      return;
    }
    const citiesData = await cityServices.getCityByName(name);
    setCities(citiesData);
  };

  const addSkill = () => {
    if (skillValue.trim()) {
      setSkills((prev)=> [skillValue.trim(), ...prev]);
      setSkillValue('');
    }
  };

  const deleteSkill = (value: string) => {
    setSkills((prev)=> prev.filter((v) => v !== value));
  };

  const handleSubmit = async (data: typeof initalValues) => {
    const city = cities.find((city) => city.title == data.city);
    const employment = typeOfEmployment.find((em) => em.title === data.employment);
    const workFormat = typeOfWork.find((em) => em.title === data.workFormat);


    try {
      await workStore.createVacancy({
        title: data.title,
        description: data.description,
        minSalary: data.minSalary,
        maxSalary: data.maxSalary,
        cityId: city?.id,
        workExperience: data.workExperience,
        employment: employment?.value || 'fulltime',
        workFormat: workFormat?.value || 'office',
        companyName: data.companyName,
        descriptionCompany: data.descriptionCompany,
        companyUrl: data.companyUrl,
        requirement: data.requirement,
        responsibilities: data.responsibilities,
        skills: skills,
      });

      Alert.alert('Вакансия успешно созданна!');
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        routerStore.pushToScene({
          name: routerNames.HOME,
        });
      }
    } catch (e) {
      Alert.alert('Что-то пошло не так');
    }
  };

  return (
    <ScrollView style={formStyles.wrapper}>
      <Formik
        initialValues={initalValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({values, errors, handleChange, handleSubmit}) => (
          <>
            <View style={formStyles.card}>
              <View style={formStyles.inputField}>
                <Text style={formStyles.title}>Название вакансии</Text>
                <InputField
                  label='Напишите название'
                  onChangeText={handleChange('title')}
                  value={values.title}
                  error={errors.title}
                />
              </View>
              <View style={formStyles.inputField}>
                <Text style={formStyles.title}>Описание</Text>
                <InputField
                  style={formStyles.inputMulti}
                  label='Описание'
                  multiline
                  onChangeText={handleChange('description')}
                  value={values.description}
                  error={errors.description}
                />
              </View>
              <View style={formStyles.inputField}>
                <Text style={formStyles.title}>Зарплата</Text>
                <View style={formStyles.row}>
                  <InputField
                    keyboardType='number-pad'
                    wrapperStyle={[formStyles.salary, formStyles.salaryMin]}
                    label='от'
                    onChangeText={handleChange('minSalary')}
                    value={`${values.minSalary || ''}`}
                    error={errors.minSalary}
                  />
                  <InputField
                    keyboardType='number-pad'
                    wrapperStyle={formStyles.salary}
                    label='До'
                    onChangeText={handleChange('maxSalary')}
                    value={`${values.maxSalary || ''}`}
                    error={errors.maxSalary}
                  />
                </View>
              </View>
            </View>
            <View style={formStyles.card}>
              <View style={formStyles.inputField}
              >
                <Text style={formStyles.title}>Город</Text>
                <InputSelect
                  options={cities.map((city) => city.title)}
                  onChangeText={(text) => {
                    getCitiesByName(text);
                    return handleChange('city')(text);
                  }}
                  value={`${values.city || ''}`}
                  error={errors.city}
                />
              </View>
              <View style={formStyles.inputField}>
                <Text style={formStyles.title}>Требуемый опыт работы</Text>
                <InputField
                  keyboardType='number-pad'
                  label='лет'
                  onChangeText={handleChange('workExperience')}
                  value={`${values.workExperience || ''}`}
                  error={errors.workExperience}
                />
              </View>
              <View style={formStyles.inputField}>
                <Text style={formStyles.title}>Тип занятости</Text>
                <InputSelect
                  onChangeText={handleChange('employment')}
                  value={`${values.employment || ''}`}
                  error={errors.employment}
                  options={typeOfEmployment.map((item) => item.title)}
                />
              </View>
              <View style={formStyles.inputField}>
                <Text style={formStyles.title}>Формат работы</Text>
                <InputSelect
                  onChangeText={handleChange('workFormat')}
                  value={`${values.workFormat || ''}`}
                  error={errors.workFormat}
                  options={typeOfWork.map((item) => item.title)}
                />
              </View>
            </View>
            <View style={formStyles.card}>
              <View style={formStyles.inputField}>
                <Text style={formStyles.title}>Название компании</Text>
                <InputField
                  onChangeText={handleChange('companyName')}
                  value={values.companyName}
                  error={errors.companyName}
                />
              </View>
              <View style={formStyles.inputField}>
                <Text style={formStyles.title}>Описание компании</Text>
                <InputField
                  style={formStyles.inputMulti}
                  label='Описание'
                  multiline
                  onChangeText={handleChange('descriptionCompany')}
                  value={values.descriptionCompany}
                  error={errors.descriptionCompany}
                />
              </View>
              <View style={formStyles.inputField}>
                <Text style={formStyles.title}>Ссылка на сайт</Text>
                <InputField
                  onChangeText={handleChange('companyUrl')}
                  value={values.companyUrl}
                  error={errors.companyUrl}
                />
              </View>
            </View>
            <View style={formStyles.card}>
              <View style={formStyles.inputField}>
                <Text style={formStyles.title}>Требование</Text>
                <InputField
                  style={formStyles.inputMulti}
                  label='Требование'
                  multiline
                  onChangeText={handleChange('requirement')}
                  value={values.requirement}
                  error={errors.requirement}
                />
              </View>
              <View style={formStyles.inputField}>
                <Text style={formStyles.title}>Обязанности</Text>
                <InputField
                  style={formStyles.inputMulti}
                  label='Обязанности'
                  multiline
                  onChangeText={handleChange('responsibilities')}
                  value={values.responsibilities}
                  error={errors.responsibilities}
                />
              </View>
              <View style={formStyles.inputField}>
                <Text style={formStyles.title}>Нужные навыки</Text>
                <View style={formStyles.skillWrapper}>
                  {skills.map((value) => (
                    <Animated.View key={value} entering={FadeInDown} exiting={FadeOutDown} layout={Layout.springify()}>
                      <TouchableOpacity onPress={() => deleteSkill(value)} style={formStyles.skill}>
                        <Skill title={value}/>
                      </TouchableOpacity>
                    </Animated.View>
                  ))}
                </View>
                <InputSelect
                  onChangeText={setSkillValue}
                  value={skillValue}
                  onEndEditing={addSkill}
                  options={SKILLS_ARR}
                />
              </View>
            </View>
            <CustomButton onPress={handleSubmit} style={formStyles.submit} title='Сохранить'/>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default VacancyForm;
