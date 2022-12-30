import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {plusIcon} from '../../assets/icons';
import BigButton from '../../components/buttons/BigButton';
import Information from '../../components/Information';
import WorkCard from '../../components/WorkCard';
import {routerNames} from '../../constants/routerNames';
import {Resume} from '../../models/Resume';
import {Vacancy} from '../../models/Vacancy';
import {routerStore} from '../../store/routerStore';
import {workStore} from '../../store/workStore';
import TabBar, {WorkTabBarType} from './components/TabBar';

const goToVacancy = (item: Vacancy) => {
  routerStore.pushToScene({
    name: routerNames.VACANCY,
    options: {
      vacancy: item,
    },
  });
};

const goToResume = (item: Resume) => {
  routerStore.pushToScene({
    name: routerNames.RESUME,
    options: {
      resume: item,
    },
  });
};


const WorkMain = () => {
  const [workType, setWorkType] = useState<WorkTabBarType>('vacancy');

  useEffect(() => {
    if (workType === 'vacancy' && workStore.isNeverLoadingVacancy) {
      workStore.fetchVacancy({});
    }
    if (workType === 'resume' && workStore.isNeverLoadingResume) {
      workStore.fetchResume({});
    }
  }, [workType]);


  const onPressAdd = () => {
    if (workType === 'vacancy') {
      routerStore.pushToScene({
        name: routerNames.VACANCY_FORM,
      });
    }
    if (workType === 'resume') {
      routerStore.pushToScene({
        name: routerNames.RESUME_FORM,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.wrapper}>
        <TabBar
          active={workType}
          onPressResume={() => setWorkType('resume')}
          onPressVacancy={() => setWorkType('vacancy')}
        />
        <BigButton
          style={styles.button}
          title={workType === 'vacancy' ? 'Создать вакансию': 'Создать резюме'}
          icon={plusIcon}
          onPress={onPressAdd}
        />
      </View>
      <View style={styles.content}>
        {workType === 'vacancy' && workStore.vacancy.length === 0 && <Information
          title='Вакансий пока нет'
          text='Попробуйте зайти позже'
        />}
        {workType === 'resume' && workStore.resume.length === 0 && <Information
          title='Резюме пока нет'
          text='Попробуйте зайти позже'
        />}
        {workType === 'vacancy' && workStore.vacancy.length !== 0 && (
          <FlatList
            data={workStore.vacancy}
            style={styles.wrapper}
            renderItem={({item}) =>(
              <Animated.View entering={FadeInDown} style={styles.item}>
                <WorkCard
                  onPress={() => goToVacancy(item)}
                  title={item.title}
                  text={item.description}
                  salary={item.minSalary}
                />
              </Animated.View>)
            }
            keyExtractor={(item) => item.id.toString()}
          />
        )}
        {workType === 'resume' && workStore.resume.length !== 0 && (
          <FlatList
            data={workStore.resume}
            style={styles.wrapper}
            renderItem={({item}) =>(
              <Animated.View entering={FadeInDown} style={styles.item}>
                <WorkCard
                  onPress={() => goToResume(item)}
                  title={item.title}
                  text={item.description}
                  salary={item.salary}
                />
              </Animated.View>)
            }
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  wrapper: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  item: {
    marginBottom: 10,
  },
  flatListItem: {
    backgroundColor: 'red',
  },
  content: {
    flex: 1,
  },
  button: {
    marginTop: 7,
  },
});

export default observer(WorkMain);
