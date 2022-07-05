import {Button, Text} from '@react-native-material/core';
import React, {useRef, useState} from 'react';
import {Alert, Image, SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import {locale} from '../../../locale';
import {theme} from '../../../styles/theme';
import {styles} from './styles';
import * as yup from 'yup';
import {Formik, FormikProps} from 'formik';
import {postStore} from '../../../store/newsStore';
import {NavigationProp} from '@react-navigation/core';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import Icon from '../../../components/Icon';
import {InputField} from '../../../components/InputField';

const formLocale = locale.postForm;
const MAX_POST_TEXT_COUNT = 5000;
const MIN_POST_TITLE_COUNT = 7;
const MAX_POST_TITLE_COUNT = 50;
const MAX_PHOTO_COUNT = 10;


const initialValues ={
  title: '',
  text: '',
};

const schema = yup.object({
  title: yup.string().min(MIN_POST_TITLE_COUNT, 'Это поле должно содержать минимум 7 символов').required(locale.fields.required),
  text: yup.string().max(MAX_POST_TEXT_COUNT),
});

type Props = {
  navigation: NavigationProp<any>,
}


export const PostFormScreen = ({navigation}: Props) => {
  const form = useRef<FormikProps<any>>(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<Asset[]>([]);

  const onSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    try {
      const error = await postStore.createPost({
        ...values,
        images,
      });

      if (error) {
        Alert.alert(error);
        return;
      }
    } catch (e) {
      Alert.alert('Не удалось создать пост, попробуйте позже');
    }

    setLoading(false);
    form.current?.handleReset();
    navigation.goBack();
  };

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
      setImages((images) => ([imageAsset[0], ...images]));
    }
  };

  const deleteIcon = (i: number) => {
    setImages((images) => (images.filter((image, index) => index != i)));
  };

  const renderIcon = (image: Asset, i: number) => {
    return <View key={i} style={styles.imageWrapper}>
      <Image source={{
        uri: image.uri,
      }}
      style={styles.image}
      />
      <TouchableOpacity style={styles.imageDelete} onPress={() => deleteIcon(i)}>
        <Icon name='cancel-circle'color={theme.error} size={20}/>
      </TouchableOpacity>
    </View>;
  };


  return (
    <SafeAreaView style={styles.wrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
        innerRef={form}
      >
        {({values, handleChange, handleSubmit, errors}) => <>
          <Text style={styles.title}>Форма добавления поста</Text>
          <InputField
            style={styles.input}
            label={formLocale.labelTitle}
            placeholder={formLocale.labelPlaceholder}
            color={theme.main}
            value={values.title}
            onChangeText={handleChange('title')}
            maxLength={MAX_POST_TITLE_COUNT}
          />
          <View style={styles.multiInputWrapper}>
            <InputField
              label={formLocale.text}
              placeholder={formLocale.textPlaceholder}
              multiline={true}
              maxLength={MAX_POST_TEXT_COUNT}
              color={theme.main}
              wrapperStyle={styles.inputWrapper}
              style={styles.multiInput}
              value={values.text}
              onChangeText={handleChange('text')}
            />
          </View>
          <Text style={styles.charCount}>{values.text.length}/{MAX_POST_TEXT_COUNT}</Text>

          <Button
            disabled={loading}
            loading={loading}
            title={'Прикрепить фото'}
            titleStyle={styles.submitText}
            style={styles.submit}
            color={theme.main}
            onPress={addPhoto}
          />
          {!!images.length && (
            <ScrollView horizontal={true} style={styles.imageContainer} contentContainerStyle={styles.imagesContentContainer}>
              {images.map(renderIcon)}
            </ScrollView>)}

          <Button
            disabled={loading}
            loading={loading}
            title={formLocale.submit}
            titleStyle={styles.submitText}
            style={styles.submit}
            color={theme.main}
            onPress={handleSubmit}
          /></>}
      </Formik>
      <View>
      </View>
    </SafeAreaView>
  );
};
