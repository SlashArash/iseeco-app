import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainWrapper: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    margin: 30,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentTemp: { textAlign: 'center', fontSize: 18 },
});

export default styles;
