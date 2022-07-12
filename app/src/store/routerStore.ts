import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouterType} from '../types/routerTypes';


class RouterStore {
  navigator: NativeStackNavigationProp<any, any> | null = null;

  setNavigatorRef(ref: any) {
    this.navigator = ref;
  }


  pushToScene(scene: RouterType) {
    this.navigator?.navigate(scene.name, scene?.options || {});
  }
}


export const routerStore = new RouterStore();
