import { StyleSheet } from 'react-native';

import { colors } from '../../constants/Theme';

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
  },
  disconnectedContainer: {
    backgroundColor: colors.red,
  },
  connectedContainer: {
    backgroundColor: colors.navyBlue,
  },
  image: {
    height: 87.5,
    width: 70,
    opacity: 0.6,
  },
  logoContainer: { flexDirection: 'row-reverse', justifyContent: 'center' },
  logo: {
    height: 20,
    width: 40,
    marginHorizontal: 10,
  },
  textWrapper: {
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 18,
    marginBottom: 3,
  },
  lightColor: {
    color: colors.light,
    flexDirection: 'row',
  },
  reconnect: {
    textDecorationLine: 'underline',
    color: colors.light,
  },
});

export default styles;
