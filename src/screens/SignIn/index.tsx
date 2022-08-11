import { Input } from '@components/Input';
import { Button } from '@components/Button';
import React from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';

import { Container, Content, Title } from './styles'


export function SignIn() {
  function handleSignIn() {
    Alert.alert('Entrar')
  }

  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Content>

          <Title>Login</Title>

          <Input
            placeholder="E-mail"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Input
            placeholder="Senha"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry
          />

          <Button type='secondary' title="Entrar" onPress={handleSignIn} />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  )
}