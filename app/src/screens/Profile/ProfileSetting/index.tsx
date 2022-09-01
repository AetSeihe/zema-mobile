import {Button, Text} from '@react-native-material/core';
import {Formik} from 'formik';
import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {Alert, FlatList, Image, ListRenderItemInfo, ScrollView, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Card} from '../../../components/Card';
import {CheckBoxWithLabel} from '../../../components/CheckBoxWithLabel';
import {InputField} from '../../../components/InputField';
import InputSelect from '../../../components/InputSelect';
import {Title} from '../../../components/Title';
import {EDUCATION_LITERAL, GENDER_LITERAL} from '../../../models/User';
import {userStore} from '../../../store/userStore';
import {theme} from '../../../styles/theme';
import {CityType} from '../../../types/userTypes';
import AddPhotoButton from './component/AddPhotoButton';
import {styles} from './styles';
import * as yup from 'yup';
import {locale} from '../../../locale';
import {cityServices} from '../../../services/cityServices';
import {routerStore} from '../../../store/routerStore';
import {routerNames} from '../../../constants/routerNames';
import {Tint} from '../../../components/Tint';
import {FileModule} from '../../../models/FileModule';
import Icon from '../../../components/Icon';
// import DatePicker from 'react-native-datepicker';
import RNDateTimePicker, {DateTimePickerAndroid, DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {dateToString} from '../../../utils/dateToString';


const ellipseIcon = require('../images/ellipse.png');

const fieldLocale = locale.fields;

const MAX_LENGHT_MULTY_FIELDS = 10000;
const MAX_LENGHT_FIELDS = 40;


const schema = yup.object().shape({
  name: yup.string().max(MAX_LENGHT_FIELDS).required(fieldLocale.required),
  surname: yup.string().max(MAX_LENGHT_FIELDS).required(fieldLocale.required),
  patronomic: yup.string().max(MAX_LENGHT_FIELDS).required(fieldLocale.required),
  birthday: yup.string(),
  cityFromName: yup.string(),
  cityToName: yup.string(),
  work: yup.string().max(MAX_LENGHT_MULTY_FIELDS),
  gender: yup.string().oneOf(Object.keys(GENDER_LITERAL), 'Это поле должно иметь значения предложенные в списке').required(fieldLocale.required),
  educacation: yup.string().oneOf(Object.values(EDUCATION_LITERAL), 'Это поле должно иметь значения предложенные в списке').required(fieldLocale.required),
  interesting: yup.string().max(MAX_LENGHT_MULTY_FIELDS),
  howCanHelp: yup.string().max(MAX_LENGHT_MULTY_FIELDS),
  needHelp: yup.string().max(MAX_LENGHT_MULTY_FIELDS),

});


const MAX_PHOTO_COUNT = 15;

const ProfileSettingScreen = () => {
  const user = userStore.user;

  if (!user) {
    return null;
  }

  const initialValues = {
    name: user.name,
    surname: user.surname || '',
    patronomic: user.patronomic || '',
    birthday: user.birthday || new Date(),
    cityFromName: user.birthCity?.title || '',
    cityToName: user.currentCity?.title || '',
    work: user.work || '',
    gender: user.gender || '',
    educacation: user.nameOfEducation || '',
    interesting: user.interesting || '',
    howCanHelp: user.howCanHelp || '',
    needHelp: user.needHelp || '',
  };


  const [images, setImages] = useState<FileModule[]>(user.images);
  const [cities, setCities] = useState<CityType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [birthdayDate, setbirthdayDate] = useState<Date>(user.birthday || new Date());

  const [mainPhoto, setMainPhoto] = useState<FileModule | undefined>(user.mainPhoto?.image);
  const [birthCity, setBirthCity] = useState<CityType | undefined>(user.birthCity);
  const [сurrentCity, setCurrentCity] = useState<CityType | undefined>(user.currentCity);


  const addPhoto = async () => {
    if (images.length == MAX_PHOTO_COUNT) {
      Alert.alert(`максимальное количество фото которое можно прикрепить ${MAX_PHOTO_COUNT}`);
      return;
    }
    const result = await launchImageLibrary({
      mediaType: 'mixed',
    });

    const imageAsset = result.assets;
    if (imageAsset && imageAsset[0]) {
      const updateUser = await userStore.update({
        images: [imageAsset[0]],
      });
      setImages(updateUser.images.reverse());
    }
  };


  const handleSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    try {
      await userStore.update({
        name: values.name,
        surname: values.surname,
        patronomic: values.patronomic,
        birthday: birthdayDate.toString(),
        gender: values.gender,
        birthCityId: birthCity?.id,
        currentCityId: сurrentCity?.id,
        education: Object.keys(EDUCATION_LITERAL).find((key) => EDUCATION_LITERAL[key] == values.educacation),
        work: values.work,
        interesting: values.interesting,
        how_can_help: values.howCanHelp,
        need_help: values.needHelp,
        mainPhotoId: mainPhoto?.id,
        images: [],
      });

      routerStore.pushToScene({
        name: routerNames.HOME,
      });
    } catch (e) {

    }
    setLoading(false);
  };

  const getCitiesByName = async (name: string) => {
    if (name.length < 2 ) {
      return;
    }

    const citiesData = await cityServices.getCityByName(name);
    setCities(citiesData);
  };
  const getCityByName = (name: string) => {
    const candidate = cities.find((city) => city.title.toLowerCase() === name.toLowerCase());
    return candidate;
  };


  const onDeletePhoto = (image: FileModule) => {
    userStore.deletePhoto(image);
    setImages((prev) => prev.filter((img) => img.id != image.id));
  };


  const renderImages = ({item}: ListRenderItemInfo<FileModule>) => {
    return (
      <TouchableOpacity onPress={() => setMainPhoto(item)} style={styles.imageWrapper}>
        <Image source={{
          uri: item.url,
        }} style={[styles.userImage, mainPhoto?.id == item.id ? styles.userMainImage: null]}/>
        <TouchableOpacity onPress={() => onDeletePhoto(item)} style={styles.deleteImage}>
          <Icon name='cancel-circle' color={'rgba(228, 27, 27, 0.53)'} size={20}/>
        </TouchableOpacity>
      </TouchableOpacity>
    )
    ;
  };

  const handleChangeDate = (date: DateTimePickerEvent) => {
    setShowDatePicker(false);
    if (date.nativeEvent.timestamp) {
      setbirthdayDate(new Date(date.nativeEvent.timestamp));
    }
  };


  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.content}>
        <Card style={styles.cart}>
          <Title style={styles.title}>Фотографии</Title>
          <FlatList
            data={images}
            renderItem={renderImages}
            keyExtractor={(item) => item.id.toString()}
            ListFooterComponent={() => <AddPhotoButton onPress={addPhoto}/>}
            horizontal
          />
          <Tint style={styles.tint}>Нажмите на фото чтобы сделать его главным</Tint>
        </Card>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={schema}
          initialValues={initialValues}
        >
          {({values, handleChange, errors, handleSubmit}) => <>
            <Card style={styles.cart}>
              <Title style={styles.title}>Основное</Title>
              <InputField wrapperStyle={styles.field} label='Имя' value={values.name} onChangeText={handleChange('name')} error={errors.name}/>
              <InputField wrapperStyle={styles.field} label='Фамилия' value={values.surname} onChangeText={handleChange('surname')} error={errors.surname}/>
              <InputField wrapperStyle={styles.field} label='Отчество' value={values.patronomic} onChangeText={handleChange('patronomic')} error={errors.patronomic}/>
            </Card>
            <Card style={styles.cart}>
              <Title style={styles.title}>О вас</Title>
              <View style={styles.field}>
                <CheckBoxWithLabel title={GENDER_LITERAL.null} value={values.gender === 'null'} onPress={() => handleChange('gender')('null')}/>
                <CheckBoxWithLabel title={GENDER_LITERAL.male} value={values.gender === 'male'} onPress={() => handleChange('gender')('male')}/>
                <CheckBoxWithLabel title={GENDER_LITERAL.female} value={values.gender === 'female'} onPress={() => handleChange('gender')('female')}/>
              </View>
              <InputField wrapperStyle={styles.field}
                label='День рождения'
                onPressIn={() => setShowDatePicker(true)}
                value={dateToString(birthdayDate)}
              />
              {showDatePicker && (
                <RNDateTimePicker
                  style={{
                    height: 200,
                    width: 200,
                    backgroundColor: 'blue',
                  }}
                  mode='datetime'
                  value={birthdayDate}
                  onChange={handleChangeDate}
                />)}
              <InputSelect
                options={cities.map((city) => city.title)}
                wrapperStyle={styles.field}
                label='Город откуда вы'
                value={values.cityFromName}
                onChangeText={(text) => {
                  getCitiesByName(text);
                  const candidate = getCityByName(text);
                  if (candidate) {
                    setBirthCity(candidate);
                  }
                  return handleChange('cityFromName')(text);
                }}
                error={errors.cityFromName}
              />
              <InputSelect
                options={cities.map((city) => city.title)}
                label='Город где вы сейчас'
                wrapperStyle={styles.field}
                value={values.cityToName}
                onChangeText={(text) => {
                  getCitiesByName(text);
                  const candidate = getCityByName(text);
                  if (candidate) {
                    setCurrentCity(candidate);
                  }
                  return handleChange('cityToName')(text);
                }}
                error={errors.cityToName}
              />
              <InputSelect
                options={Object.values(EDUCATION_LITERAL)}
                label='Образование'
                wrapperStyle={styles.field}
                value={values.educacation}
                onChangeText={handleChange('educacation')}
                error={errors.educacation}
              />
              <InputField
                label='Профессия'
                wrapperStyle={styles.field}
                style={styles.multiField}
                helperText={'Опишите вашу проффессию и чем вы обычно занимаетесь на работе'}
                multiline
                value={values.work}
                onChangeText={handleChange('work')}
                error={errors.work}
              />
              <InputField
                wrapperStyle={styles.field}
                label='Интересы'
                style={styles.multiField}
                helperText={'Опишите ваши интересы все рабочее время'}
                multiline
                value={values.interesting}
                onChangeText={handleChange('interesting')}
                error={errors.interesting}
              />

              <Button
                loading={loading}
                disabled={loading}
                title='сохранить'
                color={theme.main}
                titleStyle={styles.submitText}
                style={styles.submitContainer}
                onPress={handleSubmit}
              />
            </Card>
            <Card style={styles.cart}>
              <Title style={styles.title}>Помощь</Title>
              <InputField
                wrapperStyle={styles.field}
                label='Нужна помощь'
                style={styles.multiField}
                helperText={'Какую помощь вы бы хотели получить от других пользователей'}
                multiline
                value={values.needHelp}
                onChangeText={handleChange('needHelp')}
                error={errors.needHelp}
              />
              <InputField
                wrapperStyle={styles.field}
                label='Могу помочь'
                style={styles.multiField}
                helperText={'То как  вы можете помочь другим пользователям'}
                multiline
                value={values.howCanHelp}
                onChangeText={handleChange('howCanHelp')}
                error={errors.howCanHelp}
              />
            </Card>
            <Button
              loading={loading}
              disabled={loading}
              title='сохранить'
              color={theme.main}
              titleStyle={styles.submitText}
              style={styles.submitContainer}
              onPress={handleSubmit}
            />
          </>}
        </Formik>
      </View>
      <Image source={ellipseIcon} style={styles.ellipseIcon}/>
    </ScrollView>
  );
};

export const ProfileSetting = observer(ProfileSettingScreen);
