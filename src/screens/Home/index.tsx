import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import happyEmoji from '@assets/happy.png';
import { BorderlessButton } from 'react-native-gesture-handler';
import { TouchableOpacity, Alert, FlatList } from 'react-native';
import { useTheme } from 'styled-components';

import firestore from '@react-native-firebase/firestore';


import { Search } from '@components/Search';
import { ProductCard, ProductProps } from '@components/ProductCard';

import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  MenuHeader,
  MenuItemsNumber,
  Title
} from './styles';

export function Home() {
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState('');
  const { COLORS } = useTheme();

  //Função para buscar pizza no banco firestore
  function fetchPizzas(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore().collection('pizzas').orderBy('name_insensitive').startAt(formattedValue).endAt(`${formattedValue}\uf8ff`).get().then(response => {
      const data = response.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as ProductProps[];

      setPizzas(data);
    }).catch(() => Alert.alert('Consulta', 'Não foi possível realizar a consulta'))
  }

  //Função para buscar uma pizza x digitada
  function handleSearch() {
    fetchPizzas(search);
  }

  //Função para limpar a busca
  function handleSearchClear() {
    setSearch('');
    fetchPizzas('');
  }

  useEffect(() => {
    fetchPizzas('');
  }, [])

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>

        <TouchableOpacity>
          <MaterialIcons name="logout" size={24} color={COLORS.TITLE} />
        </TouchableOpacity>
      </Header>

      <Search
        onChangeText={setSearch}
        value={search}
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>10 pizzas</MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProductCard
          data={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          {
            paddingTop: 20,
            paddingBottom: 125,
            marginHorizontal: 24
          }
        }
      />

    </Container>
  )
}