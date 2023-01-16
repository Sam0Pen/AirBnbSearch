import { StyleSheet, Text, View } from 'react-native';

export const ApartmentItem = ({
  city,
  name,
  room_type,
  host_name,
  neighbourhood_group,
  neighbourhood,
  state,
}) => {

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.normal}>{room_type}</Text>
      <Text style={styles.host}>{host_name}</Text>
      <Text style={styles.normal}>{neighbourhood_group && neighbourhood_group + ', '}{neighbourhood}</Text>
      <Text style={styles.normal}>{state}, {city}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    borderTopWidth: 0.5,
    borderTopColor: '#d1d1d1',
    padding: 8,
    marginVertical: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '500'
  },
  normal: {
    fontSize: 12,
  },
  host: {
    fontSize: 9,
    color: '#282929',
    marginBottom: 10
  }
});