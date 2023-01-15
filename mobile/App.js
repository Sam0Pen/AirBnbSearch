import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TextInput, View } from 'react-native';
import { ApartmentItem } from './src/components/ApartmentItem';

export default function App() {
  const [data, setData ] = useState([])
  
  useEffect(() => {
    fetch('http://10.0.2.2:4000/')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error))
  }, [])

  return (
    <View style={styles.container}>
      <TextInput
        value='1234'
        style={styles.input}
      />
      <FlatList
        data={data}
        style={styles.list}
        renderItem={({item}) => <ApartmentItem city={item.city} />}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#d6d6d6',
    width: '90%',
    padding: 10,
    margin: 20,
    height: 40,
    borderRadius: 5,
  },
  list: {
    width: '100%'
  }
});
