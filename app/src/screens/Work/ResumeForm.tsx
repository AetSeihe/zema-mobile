import {Text} from '@react-native-material/core';
import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import CustomButton from '../../components/CustomButton';
import {InputField} from '../../components/InputField';
import InputSelect from '../../components/InputSelect';
import {cityServices} from '../../services/cityServices';
import {CityType} from '../../types/userTypes';
import {formStyles} from './styles';
import * as yup from 'yup';
import {locale} from '../../locale';
import {Formik} from 'formik';
import {NavigationProp} from '@react-navigation/core';
import {routerStore} from '../../store/routerStore';
import {routerNames} from '../../constants/routerNames';
import Animated, {FadeInDown, FadeOutDown, Layout} from 'react-native-reanimated';
import Skill from '../../components/Skill';
import {workStore} from '../../store/workStore';

const SKILLS_ARR = ['Дизайн', 'Верстка', 'Программирование', 'Парикмахер'];


const initalValues = {
  title: '',
  salary: 0,
  workExperience: 0,
  description: '',
  city: '',
};

const schema = yup.object({
  title: yup.string().required(locale.fields.required),
  salary: yup.number().required(locale.fields.required),
  workExperience: yup.number().required(locale.fields.required),
  description: yup.string().required(locale.fields.required),
  city: yup.string().required(locale.fields.required),

});

type Props = {
  navigation: NavigationProp<any>
}

const ResumeForm = ({navigation}:Props) => {
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

    try {
      await workStore.createResume({
        cityId: city?.id,
        title: data.title,
        salary: data.salary,
        workExperience: data.workExperience,
        description: data.description,
        skills: skills,
      });


      Alert.alert('Резюме успешно созданно!');
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
                <Text style={formStyles.title}>Ваша должность</Text>
                <InputField
                  label='Напишите название'
                  onChangeText={handleChange('title')}
                  value={values.title}
                  error={errors.title}
                />
              </View>
              <View style={formStyles.inputField}>
                <Text style={formStyles.title}>Описание и ключевые нвыки</Text>
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
                <Text style={formStyles.title}>Ожидание по зарплате</Text>
                <InputField
                  label='Напишите название'
                  onChangeText={handleChange('salary')}
                  value={`${values.salary || ''}`}
                  error={errors.salary}
                />
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
                <Text style={formStyles.title}>Опыт работы</Text>
                <InputField
                  keyboardType='number-pad'
                  label='лет'
                  onChangeText={handleChange('workExperience')}
                  value={`${values.workExperience || ''}`}
                  error={errors.workExperience}
                />
              </View>
              <View style={formStyles.inputField}>
                <Text style={formStyles.title}>Навыки</Text>
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

export default ResumeForm;
