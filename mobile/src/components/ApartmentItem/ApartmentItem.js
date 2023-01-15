import { StyleSheet, Text, View } from 'react-native';

export const ApartmentItem = ({city}) => {

  return (
    <View style={styles.item}>
      <Text>{city}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    borderBottomWidth: 1,
    padding: 20,
    marginVertical: 8,
  },
});