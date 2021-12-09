import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 45,
    flex: 1,
    justifyContent: 'flex-end',
  },
  result: {
    color: 'white',
    fontSize: 60,
    textAlign: 'right',
    marginBottom: 15,
  },
  ans: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 30,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
