import {Button, ButtonProps, Text} from '@react-native-material/core';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ViewStyle} from 'react-native-material-ui';
import {theme} from '../../styles/theme';
import {styles} from './styles';


type Props = {
  theme?: 'default' | 'main' | 'error',
  adjustsFontSizeToFit?: boolean,
  onPress?: () => void;
  title?: string;
  style?: ViewStyle,
}

const CustomButton = ({theme: buttonTheme = 'default', titleStyle, style, title, adjustsFontSizeToFit, ...props}: Props & ButtonProps) => {
  if (buttonTheme === 'main') {
    return (
      <LinearGradient
        colors={['#79EDC3', '#79EDC3', '#5cced3', '#087BFF']}
        start={{x: 0, y: 2}}
        style={[styles.wrapper, style]}
      >
        <TouchableOpacity style={[styles.wrapperStyle]} onPress={props.onPress}>
          <Text style={styles.title} adjustsFontSizeToFit={adjustsFontSizeToFit}>{title}</Text>
        </TouchableOpacity>
      </LinearGradient>

    );
  }

  return (
    <Button
      title={title}
      {...props}
      color={theme.main}
      titleStyle={[styles.textColor, titleStyle]}
      style={[styles.normalButtonStyle, style]}
    />
  );
};

export default CustomButton;
