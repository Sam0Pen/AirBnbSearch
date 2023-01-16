import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TextInput, Text, View } from 'react-native';
import { ApartmentItem } from './src/components/ApartmentItem';
import { useDebounce } from './src/helpers/UseDebounce';

export default function App() {
  const [data, setData ] = useState([])
  const [ inputData, setInputData ] = useState('');
  const [ loading, setLoading ] = useState(true);

  const debouncedSearch = useDebounce(inputData, 1500);

  useEffect(() => {
    if (debouncedSearch) {
      fetch(`http://10.0.2.2:4000/search/?text=${inputData}&limit=400000`)
        .then((response) => response.json())
        .then((data) => setData(data))
        .then(() => setLoading(false))
        .catch((error) => console.error(error));
    } else {
      setData([]);
      setLoading(false);
    }
  }, [debouncedSearch])

  const handleChange = (value) => {
    setInputData(value);
    setLoading(true);
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={text => handleChange(text)}
        defaultValue={inputData}
        placeholder='Type to look for apartment'
        style={styles.input}
      />
      {loading ? <Text>Loading...</Text>
      : 
      <FlatList
        data={data}
        style={styles.list}
        renderItem={({item}) => 
          <ApartmentItem
            city={item.city}
            name={item.name}
            room_type={item.room_type}
            host_name={item.host_name}
            neighbourhood_group={item.neighbourhood_group}
            neighbourhood={item.neighbourhood}
            state={item.state}
          />}
      />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  input: {
    backgroundColor: '#d6d6d6',
    width: '90%',
    padding: 10,
    margin: 15,
    marginTop: 25,
    height: 40,
    borderRadius: 5,
  },
  list: {
    width: '100%'
  }
});
