import { Input } from '@components/Input';
import { Button } from '@components/Button';
import React from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';

import { Container, Content, Title, Brand, ForgotPasswordButton, ForgotPasswordLabel } from './styles'

import brandImg from '@assets/brand.png';


export function SignIn() {
  function handleSignIn() {
    Alert.alert('Entrar')
  }

  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Content>

          <Brand source={brandImg} />

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

          <ForgotPasswordButton>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button type='secondary' title="Entrar" onPress={handleSignIn} />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  )
}