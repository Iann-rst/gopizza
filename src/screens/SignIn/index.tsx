import { Input } from '@components/Input';
import React from 'react';
import { Container } from './styles'

export function SignIn() {
  return (
    <Container>
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
    </Container>
  )
}