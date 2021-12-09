import React, {useState} from 'react';
import {Text, View} from 'react-native';

import Button from '../components/Button';
import {styles} from '../theme/appTheme';

const CalculatorScreen = () => {
  const [number, setNumber] = useState<string>('1500');
  const [ans, setAns] = useState<string>('0');

  const clean = () => setNumber('0');

  const buildResult = (payload?: string) => {
    // No double point
    if (number.includes('.') && payload === '.') {
      return;
    }

    if (number.startsWith('0') || number.startsWith('-0')) {
      // Decimal point
      if (payload === '.') {
        setNumber(number + payload);
        // Evaluate if there is zero, and there is a point
      } else if (payload === '0' && number.includes('.')) {
        setNumber(number + payload);
        // Evaluate if it is different from zero and has no point
      } else if (payload !== '0' && !number.includes('.')) {
        setNumber(payload!);
        // Prevent 000.0
      } else if (payload === '0' && !number.includes('.')) {
        return;
      } else {
        setNumber(number + payload);
      }
    } else {
      setNumber(number + payload);
    }
  };
  const positveAndNegative = () => {
    number.includes('-')
      ? setNumber(number.replace('-', ''))
      : setNumber('-' + number);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.ans}>{ans}</Text>
      <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
        {number}
      </Text>
      <View style={styles.row}>
        <Button
          text={'C'}
          color={'black'}
          backgroundColor={'#A5A5A5'}
          action={clean}
        />
        <Button
          action={positveAndNegative}
          text={'+/-'}
          color={'black'}
          backgroundColor={'#A5A5A5'}
        />
        <Button
          action={buildResult}
          text={'%'}
          color={'black'}
          backgroundColor={'#A5A5A5'}
        />
        <Button action={buildResult} text={'/'} backgroundColor={'#F1A33B'} />
      </View>
      <View style={styles.row}>
        <Button action={buildResult} text={'7'} />
        <Button action={buildResult} text={'8'} />
        <Button action={buildResult} text={'9'} />
        <Button action={buildResult} text={'x'} backgroundColor={'#F1A33B'} />
      </View>
      <View style={styles.row}>
        <Button action={buildResult} text={'6'} />
        <Button action={buildResult} text={'5'} />
        <Button action={buildResult} text={'4'} />
        <Button action={buildResult} text={'-'} backgroundColor={'#F1A33B'} />
      </View>
      <View style={styles.row}>
        <Button action={buildResult} text={'3'} />
        <Button action={buildResult} text={'2'} />
        <Button action={buildResult} text={'1'} />
        <Button action={buildResult} text={'+'} backgroundColor={'#F1A33B'} />
      </View>
      <View style={styles.row}>
        <Button action={buildResult} text={'0'} double />
        <Button action={buildResult} text={'.'} />
        <Button action={buildResult} text={'='} backgroundColor={'#F1A33B'} />
      </View>
    </View>
  );
};
export default CalculatorScreen;
