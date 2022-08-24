import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {routerNames} from '../constants/routerNames';
import {RouterType} from '../types/routerTypes';


class RouterStore {
  navigator: NativeStackNavigationProp<any, any> | null = null;

  setNavigatorRef(ref: any) {
    this.navigator = ref;
  }


  pushToScene(scene: RouterType) {
    this.navigator?.navigate(scene.name, scene?.options || {});
  }

  reset(scene: routerNames) {
    this.navigator?.reset({
      index: 0,
      routes: [{name: scene}],
    });
  }
}


export const routerStore = new RouterStore();
