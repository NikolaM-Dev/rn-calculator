import React from 'react';
import {Text, View} from 'react-native';

import Button from '../components/Button';
import {styles} from '../theme/appTheme';

const CalculatorScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.ans}>1,500.00</Text>
      <Text style={styles.result}>1,500.00</Text>
      <View style={styles.row}>
        <Button text={'C'} color={'black'} backgroundColor={'#A5A5A5'} />
        <Button text={'+/-'} color={'black'} backgroundColor={'#A5A5A5'} />
        <Button text={'%'} color={'black'} backgroundColor={'#A5A5A5'} />
        <Button text={'/'} backgroundColor={'#F1A33B'} />
      </View>
      <View style={styles.row}>
        <Button text={'7'} />
        <Button text={'8'} />
        <Button text={'9'} />
        <Button text={'x'} backgroundColor={'#F1A33B'} />
      </View>
      <View style={styles.row}>
        <Button text={'6'} />
        <Button text={'5'} />
        <Button text={'4'} />
        <Button text={'-'} backgroundColor={'#F1A33B'} />
      </View>
      <View style={styles.row}>
        <Button text={'3'} />
        <Button text={'2'} />
        <Button text={'1'} />
        <Button text={'+'} backgroundColor={'#F1A33B'} />
      </View>
      <View style={styles.row}>
        <Button text={'0'} />
        <Button text={','} />
        <Button text={''} />
        <Button text={'='} backgroundColor={'#F1A33B'} />
      </View>
    </View>
  );
};
export default CalculatorScreen;
