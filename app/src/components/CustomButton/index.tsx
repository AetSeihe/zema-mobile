import { Button, ButtonProps, Text } from '@react-native-material/core';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ViewStyle } from 'react-native-material-ui';
import { theme } from '../../styles/theme';
import { styles } from './styles';

export type ButtonThemeType = 'default' | 'main' | 'error' | 'gray';
type Props = {
  theme?: ButtonThemeType,
  adjustsFontSizeToFit?: boolean,
  onPress?: () => void;
  title?: string;
  style?: ViewStyle,
}

const getStyleExtendsTheme = (type: ButtonThemeType) => {
  if (type === 'gray') {
    return '#c2c3c4';
  }

  return theme.main;
};

const CustomButton = ({ theme: buttonTheme = 'default', titleStyle, style, title, adjustsFontSizeToFit, loading, ...props }: Props & ButtonProps) => {
  if (buttonTheme === 'main') {
    return (
      <LinearGradient
        colors={['#79EDC3', '#79EDC3', '#5cced3', '#087BFF']}
        start={{ x: 0, y: 2 }}
        style={[styles.wrapper, style, props.disabled ? styles.disabled : {}]}
      >
        <TouchableOpacity style={[styles.wrapperStyle]} onPress={props.onPress} disabled={props.disabled}>
          <Text style={styles.title} adjustsFontSizeToFit={adjustsFontSizeToFit}>
            {loading ? 'Загрузка...' : title}
          </Text>
        </TouchableOpacity>
      </LinearGradient>

    );
  }

  return (
    <Button
      title={title}
      {...props}
      color={getStyleExtendsTheme(buttonTheme)}
      titleStyle={[styles.textColor, titleStyle]}
      style={[styles.normalButtonStyle, style]}
    />
  );
};

export default CustomButton;
