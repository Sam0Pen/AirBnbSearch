import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TextInput, Text, View } from 'react-native';
import ApartmentItem from './src/components/ApartmentItem/ApartmentItem';
import { EmptyList } from './src/components/EmptyList';
import { useDebounce } from './src/helpers/UseDebounce';

export default function App() {
  const [ data, setData ] = useState([]);
  const [ limitedData, setLimitedData ] = useState([]);
  const [ inputData, setInputData ] = useState('');
  const [ loading, setLoading ] = useState(true);
  const [ offset, setOffset ] = useState(1);

  const keyExtractor = (item, index) => index;
  let itemNum = 50;
  let initialLoadNumber = 20;

  const debouncedSearch = useDebounce(inputData, 1500);

  const loadMore = () => {
    if (limitedData.length < data.length && data.length != 0) {
      setOffset(offset + 1);
      setLimitedData(data.slice(0,offset*itemNum));
    }
  }

  const listItem = ({item}) => {
    return (
      <ApartmentItem
        item={item}
      />
    )
  }

  useEffect(() => {
    if (debouncedSearch) {
      setData([]);
      fetch(`http://10.0.2.2:4000/search/?text=${inputData}&limit=400000`)
        .then((response) => response.json())
        .then((data) => setData(data))
        .then(() => setLoading(false))
        .catch((error) => console.error(error));
      setOffset(1);
    } else {
      setLoading(false);
    }
    console.log('data', data.length, 'limitedData', limitedData.length)
  }, [debouncedSearch])

  useEffect(()=> {
    setLimitedData(data.slice(0,offset*initialLoadNumber )) 
  }, [data]);

  const handleChange = (value) => {
    setInputData(value);
    setLoading(true);
  }

  const clearField = () => {
    setData([]);
    setLimitedData([]);
    setOffset(1);
    setInputData('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputwrap}>
        <TextInput
          onChangeText={text => handleChange(text)}
          defaultValue={inputData}
          placeholder='Type to look for apartment'
          style={styles.input}
        />
        <AntDesign
          style={styles.icon}
          name='closecircle'
          size={24}
          color='#a7a7a7'
          onPress={() => clearField()}
        />
      </View>
      {loading ? <View style={styles.loading}><Text>Loading...</Text></View>
      : 
      <FlatList
        data={limitedData}
        extraData={data}
        style={styles.list}
        renderItem={listItem}
        ListEmptyComponent={<EmptyList />}
        initialNumToRender={initialLoadNumber}
        maxToRenderPerBatch={itemNum}
        updateCellsBatchingPeriod={itemNum/2}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={offset < 10 ? (offset*(offset == 1 ? 2 : 2)):20}
        onEndReached={loadMore}
        removeClippedSubviews={true}
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
    zIndex: 2,
  },
  list: {
    width: '100%',
    height: '80%',
  },
  inputwrap: {
    display: 'flex'
  },
  icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    zIndex: 3,
    marginTop: 33,
    paddingRight: 32,
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
  }
});
