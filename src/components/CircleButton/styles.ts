import { StyleSheet } from 'react-native';

import { colors } from '../../constants/Theme';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    margin: 10,
    padding: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.smoke,
  },
  image: {
    width: 35,
    height: 35,
  },
});

export default styles;
