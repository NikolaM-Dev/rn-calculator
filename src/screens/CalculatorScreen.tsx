import React from 'react';
import { Text, View } from 'react-native';

import { styles } from '../theme/appTheme';
import Button from '../components/Button';
import useCalculator, { Operators } from '../hooks/useCalculator';

const CalculatorScreen = () => {
  const {
    ans,
    handleBuildResult,
    handleCalculate,
    handleClean,
    handleDel,
    handleOperation,
    handlePositveAndNegative,
    number,
  } = useCalculator();

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
          action={handleClean}
          backgroundColor={'#A5A5A5'}
          color={'black'}
          text={'C'}
        />
        <Button
          action={handlePositveAndNegative}
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
        <Button action={handleBuildResult} text={'7'} />
        <Button action={handleBuildResult} text={'8'} />
        <Button action={handleBuildResult} text={'9'} />
        <Button
          action={() => handleOperation(Operators.multiplication)}
          backgroundColor={'#F1A33B'}
          text={'x'}
        />
      </View>
      <View style={styles.row}>
        <Button action={handleBuildResult} text={'6'} />
        <Button action={handleBuildResult} text={'5'} />
        <Button action={handleBuildResult} text={'4'} />
        <Button
          action={() => handleOperation(Operators.subtract)}
          backgroundColor={'#F1A33B'}
          text={'-'}
        />
      </View>
      <View style={styles.row}>
        <Button action={handleBuildResult} text={'3'} />
        <Button action={handleBuildResult} text={'2'} />
        <Button action={handleBuildResult} text={'1'} />
        <Button
          action={() => handleOperation(Operators.add)}
          backgroundColor={'#F1A33B'}
          text={'+'}
        />
      </View>
      <View style={styles.row}>
        <Button double action={handleBuildResult} text={'0'} />
        <Button action={handleBuildResult} text={'.'} />
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
