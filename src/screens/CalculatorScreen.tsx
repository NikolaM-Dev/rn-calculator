import React, { useRef, useState } from 'react';
import { Text, View } from 'react-native';

import Button from '../components/Button';
import { styles } from '../theme/appTheme';

enum Operators {
  add,
  subtract,
  divide,
  percentage,
  multiplication,
}

const CalculatorScreen = () => {
  const [number, setNumber] = useState<string>('0');
  const [ans, setAns] = useState<string>('0');
  const lastOperation = useRef<Operators>();

  const clean = () => {
    setNumber('0');
    setAns('0');
  };

  const buildResult = (payload?: string) => {
    if (!payload) return;
    // Division by 0
    if (number.includes('NaN') || number.includes('Infinity'))
      return setNumber(payload);
    // No double point
    if (number.includes('.') && payload === '.') return;

    if (number.startsWith('0') || number.startsWith('-0')) {
      // Decimal point
      if (payload === '.') setNumber(number + payload);
      // Evaluate if there is zero, and there is a point
      else if (payload === '0' && number.includes('.'))
        setNumber(number + payload);
      // Evaluate if it is different from zero and has no point
      else if (payload !== '0' && !number.includes('.')) setNumber(payload);
      // Prevent 000.0
      else if (payload === '0' && !number.includes('.')) return;
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

  const handlePercentage = (operator: Operators): void => {
    lastOperation.current = operator;
    const num1 = Number(ans);
    const num2 = Number(number);
    const percentage = ((num1 / 100) * num2).toFixed(2);

    setAns('0');

    if (percentage.split('.')[1] === '00')
      return setNumber(percentage.split('.')[0]);

    setNumber(percentage);
  };

  const handleOperation = (operator: Operators) => {
    if (
      lastOperation.current === Operators.multiplication &&
      operator === Operators.percentage
    )
      return handlePercentage(operator);

    if (
      lastOperation.current === Operators.percentage &&
      operator === Operators.percentage
    )
      return;

    lastOperation.current = operator;
    handleSendToAns();
  };

  const handleCalculate = (): void => {
    const num1 = Number(ans);
    const num2 = Number(number);

    switch (lastOperation.current) {
      case Operators.add:
        break;

      case Operators.subtract:
        setNumber(`${num1 - num2}`);
        break;

      case Operators.multiplication:
        setNumber(`${num1 * num2}`);
        break;

      case Operators.divide:
        setNumber(`${num1 / num2}`);
        break;
    }

    setAns('0');
  };

  return (
    <View style={styles.wrapper}>
      {ans !== '0' && <Text style={styles.ans}>{ans}</Text>}
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
          action={() => handleOperation(Operators.percentage)}
          backgroundColor={'#A5A5A5'}
          color={'black'}
          text={'%'}
        />
        <Button
          action={() => handleOperation(Operators.divide)}
          backgroundColor={'#F1A33B'}
          text={'/'}
        />
      </View>
      <View style={styles.row}>
        <Button action={buildResult} text={'7'} />
        <Button action={buildResult} text={'8'} />
        <Button action={buildResult} text={'9'} />
        <Button
          action={() => handleOperation(Operators.multiplication)}
          backgroundColor={'#F1A33B'}
          text={'x'}
        />
      </View>
      <View style={styles.row}>
        <Button action={buildResult} text={'6'} />
        <Button action={buildResult} text={'5'} />
        <Button action={buildResult} text={'4'} />
        <Button
          action={() => handleOperation(Operators.subtract)}
          backgroundColor={'#F1A33B'}
          text={'-'}
        />
      </View>
      <View style={styles.row}>
        <Button action={buildResult} text={'3'} />
        <Button action={buildResult} text={'2'} />
        <Button action={buildResult} text={'1'} />
        <Button
          action={() => handleOperation(Operators.add)}
          backgroundColor={'#F1A33B'}
          text={'+'}
        />
      </View>
      <View style={styles.row}>
        <Button double action={buildResult} text={'0'} />
        <Button action={buildResult} text={'.'} />
        <Button
          action={handleCalculate}
          backgroundColor={'#F1A33B'}
          text={'='}
        />
      </View>
    </View>
  );
};

export default CalculatorScreen;
