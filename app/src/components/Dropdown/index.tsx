import React, {ReactNode, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {theme} from '../../styles/theme';
import {Card} from '../Card';
import Icon from '../Icon';
import {Title} from '../Title';
import {styles} from './styles';


type Props = {
    title: string;
    children: ReactNode
}

const Dropdown = ({title, children}: Props) => {
  const [visible, setVisible] = useState(false);
  return (
    <Card style={styles.wrapper}>
      <Title>{title}</Title>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <Icon name={visible ? 'circle-up': 'circle-down'} size={23} color={theme.main}/>
      </TouchableOpacity>
      {visible && children}
    </Card>
  );
};

export default Dropdown;
