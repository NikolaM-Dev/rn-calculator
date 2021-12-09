import React, { useState } from 'react';
import { Text, View } from 'react-native';

import Button from '../components/Button';
import { styles } from '../theme/appTheme';

const CalculatorScreen = () => {
  const [number, setNumber] = useState<string>('0');
  const [ans, setAns] = useState<string>('0');

  const clean = () => setNumber('0');

  const buildResult = (payload?: string) => {
    // No double point
    if (number.includes('.') && payload === '.') {
      return;
    }

    if (number.startsWith('0') || number.startsWith('-0')) {
      // Decimal point
      if (payload === '.') setNumber(number + payload);
      // Evaluate if there is zero, and there is a point
      else if (payload === '0' && number.includes('.'))
        setNumber(number + payload);
      // Evaluate if it is different from zero and has no point
      else if (payload !== '0' && !number.includes('.')) {
        if (payload) setNumber(payload);
        // Prevent 000.0
      } else if (payload === '0' && !number.includes('.')) return;
      else setNumber(number + payload);
    } else setNumber(number + payload);
  };

  const positveAndNegative = () => {
    number.includes('-')
      ? setNumber(number.replace('-', ''))
      : setNumber('-' + number);
  };

  const handleDel = (): void => {
    let negative = '';
    let tempNumber = number;

    if (number.includes('-')) {
      negative = '-';
      tempNumber = number.replace('-', '');
    }

    if (tempNumber.length > 1)
      return setNumber(negative + tempNumber.slice(0, -1));

    setNumber('0');
  };

  const handleSendToAns = (): void => {
    if (number.endsWith('.')) setAns(number.slice(0, -1));
    else setAns(number);

    setNumber('0');
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.ans}>{ans}</Text>
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        style={styles.result}
        onPress={handleDel}>
        {number}
      </Text>
      <View style={styles.row}>
        <Button
          action={clean}
          backgroundColor={'#A5A5A5'}
          color={'black'}
          text={'C'}
        />
        <Button
          action={positveAndNegative}
          backgroundColor={'#A5A5A5'}
          color={'black'}
          text={'+/-'}
        />
        <Button
          action={handleSendToAns}
          backgroundColor={'#A5A5A5'}
          color={'black'}
          text={'%'}
        />
        <Button
          action={handleSendToAns}
          backgroundColor={'#F1A33B'}
          text={'/'}
        />
      </View>
      <View style={styles.row}>
        <Button action={buildResult} text={'7'} />
        <Button action={buildResult} text={'8'} />
        <Button action={buildResult} text={'9'} />
        <Button
          action={handleSendToAns}
          backgroundColor={'#F1A33B'}
          text={'x'}
        />
      </View>
      <View style={styles.row}>
        <Button action={buildResult} text={'6'} />
        <Button action={buildResult} text={'5'} />
        <Button action={buildResult} text={'4'} />
        <Button
          action={handleSendToAns}
          backgroundColor={'#F1A33B'}
          text={'-'}
        />
      </View>
      <View style={styles.row}>
        <Button action={buildResult} text={'3'} />
        <Button action={buildResult} text={'2'} />
        <Button action={buildResult} text={'1'} />
        <Button
          action={handleSendToAns}
          backgroundColor={'#F1A33B'}
          text={'+'}
        />
      </View>
      <View style={styles.row}>
        <Button double action={buildResult} text={'0'} />
        <Button action={buildResult} text={'.'} />
        <Button action={buildResult} backgroundColor={'#F1A33B'} text={'='} />
      </View>
    </View>
  );
};

export default CalculatorScreen;
