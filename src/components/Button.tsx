import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface Props {
  text: string;
  color?: string;
  backgroundColor?: string;
}

const Button = ({
  text,
  color = 'white',
  backgroundColor = '#333333',
}: Props) => {
  return (
    <View
      style={{
        ...styles.button,
        backgroundColor,
      }}>
      <Text
        style={{
          ...styles.textButton,
          color,
        }}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 85,
    height: 85,
    borderRadius: 100,
    justifyContent: 'center',
    margin: 8,
  },
  textButton: {
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: '500',
  },
});

export default Button;
