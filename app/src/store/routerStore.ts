import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouterTabBarType, RouterType} from '../types/routerTypes';


class RouterStore {
  navigator: NativeStackNavigationProp<any, any> | null = null;
  tabBarNavigator: NativeStackNavigationProp<any, any> | null = null;

  setNavigatorRef(ref: any) {
    this.navigator = ref;
  }

  setTabNavigatorRef(ref: any) {
    this.tabBarNavigator = ref;
  }

  tabBarNavigatorGoTo(scene: RouterTabBarType) {
    this.tabBarNavigator?.navigate(scene.name, scene?.options || {});
  }

  pushToScene(scene: RouterType) {
    this.navigator?.navigate(scene.name, scene?.options || {});
  }
}


export const routerStore = new RouterStore();
