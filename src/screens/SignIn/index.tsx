import { Input } from '@components/Input';
import { Button } from '@components/Button';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';

import { Container, Content, Title, Brand, ForgotPasswordButton, ForgotPasswordLabel } from './styles'

import brandImg from '@assets/brand.png';

import { useAuth } from '@hooks/auth'


export function SignIn() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const { signIn, isLogging } = useAuth();

  function handleSignIn() {
    signIn(email, password);
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
            onChangeText={setEmail}
          />

          <Input
            placeholder="Senha"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry
            onChangeText={setPassword}
          />

          <ForgotPasswordButton>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button type='secondary' title="Entrar" onPress={handleSignIn} isLoading={isLogging} />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  )
}