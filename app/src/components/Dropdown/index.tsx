import React, {ReactNode} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ViewStyle} from 'react-native-material-ui';
import {theme} from '../../styles/theme';
import {Card} from '../Card';
import Icon from '../Icon';
import {Title} from '../Title';
import {styles} from './styles';


type Props = {
    title: string;
    children: ReactNode,
    visible: boolean,
    onPressClose: () => void,
    wrapperStyle?: ViewStyle
}

const Dropdown = ({title, children, visible, onPressClose, wrapperStyle}: Props) => {
  return (
    <Card style={wrapperStyle}>
      <View style={styles.content}>
        <Title>{title}</Title>
        <TouchableOpacity onPress={() => onPressClose()} >
          <Icon name={visible ? 'circle-up': 'circle-down'} size={23} color={theme.main}/>
        </TouchableOpacity>
      </View>
      {visible && <View style={styles.children}>
        {children}
      </View>}


    </Card>
  );
};

export default Dropdown;
