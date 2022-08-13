import React, { useState, useCallback, } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import happyEmoji from '@assets/happy.png';
import { BorderlessButton } from 'react-native-gesture-handler';
import { TouchableOpacity, Alert, FlatList } from 'react-native';
import { useTheme } from 'styled-components';

import firestore from '@react-native-firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Search } from '@components/Search';
import { ProductCard, ProductProps } from '@components/ProductCard';


import { useAuth } from '@hooks/auth'

import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  MenuHeader,
  MenuItemsNumber,
  Title,
  NewProductionButton
} from './styles';

export function Home() {
  const { user, signOut } = useAuth();

  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState('');

  const { COLORS } = useTheme();
  const navigation = useNavigation();

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

  function handleOpen(id: string) {
    const route = user?.isAdmin ? 'product' : 'order'
    navigation.navigate(route, { id });
  }

  function handleAdd() {
    navigation.navigate('product', {});
  }



  useFocusEffect(useCallback(() => {
    fetchPizzas('');
  }, [])
  );

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, {user?.isAdmin ? 'Admin' : 'Garçom'}</GreetingText>
        </Greeting>

        <TouchableOpacity onPress={signOut}>
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
        <MenuItemsNumber>{pizzas.length} pizzas</MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
        (<ProductCard
          data={item}
          onPress={() => handleOpen(item.id)}
        />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          {
            paddingTop: 20,
            paddingBottom: 125,
            marginHorizontal: 24
          }
        }
      />

      {user?.isAdmin &&
        <NewProductionButton title="Cadastrar Pizza" type="secondary" onPress={handleAdd} />
      }
    </Container>
  )
}