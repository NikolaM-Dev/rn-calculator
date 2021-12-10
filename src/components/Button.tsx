import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  text: string;
  color?: string;
  backgroundColor?: string;
  double?: boolean;
  action: (payload?: string) => void;
}

const Button = ({
  text,
  color = 'white',
  backgroundColor = '#333333',
  double,
  action,
}: Props) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor,
        width: !double ? 70 : 160,
      }}
      onPress={() => action(text)}>
      <Text
        style={{
          ...styles.textButton,
          color,
          textAlign: !double ? 'center' : 'left',
          paddingLeft: !double ? 0 : 28,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 70,
    borderRadius: 100,
    justifyContent: 'center',
    margin: 6,
  },
  textButton: {
    fontSize: 32,
    fontWeight: '500',
  },
});

export default Button;
