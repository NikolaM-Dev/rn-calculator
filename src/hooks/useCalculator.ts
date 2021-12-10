import { useRef, useState } from 'react';

export enum Operators {
  add,
  subtract,
  divide,
  percentage,
  multiplication,
}

const useCalculator = () => {
  const [number, setNumber] = useState<string>('0');
  const [ans, setAns] = useState<string>('0');
  const lastOperation = useRef<Operators>();

  const handleClean = () => {
    setNumber('0');
    setAns('0');
  };

  const handleBuildResult = (payload?: string) => {
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

  const handlePositveAndNegative = () => {
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
        setNumber(`${num1 + num2}`);
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

  return {
    ans,
    handleBuildResult,
    handleCalculate,
    handleClean,
    handleDel,
    handleOperation,
    handlePositveAndNegative,
    number,
  };
};

export default useCalculator;
