import { Alert } from 'react-native'
import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import axios from 'axios'
import { api } from '@services/api'

import { AppError } from '@utils/AppError'

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { useState } from 'react'
import { useAuth } from '@hooks/useAuth'

type FormDataProps = {
  name: string
  email: string
  password: string
  password_confirm: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  password_confirm: yup.string().required('Confirmação a senha.').oneOf([yup.ref('password'), null], 'As senhas não combinam.'),
})

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const navigation = useNavigation()
  const toast = useToast()

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  })

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      setIsLoading(true)
      await api.post('/users', { name, email, password })
      await signIn(email, password)
    } catch (error) {
      setIsLoading(false)

      const title = error instanceof AppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'bottom',
        bgColor: 'red.500',
      })
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={10} pb={16} >
        <Image source={BackgroundImg} alt="Pessoas treinando" resizeMode='contain' position="absolute" defaultSource={BackgroundImg} />
        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">Treine sua mente e o seu corpo</Text>
        </Center>
        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">Crie sua conta</Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Repetir senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)} isLoading={isLoading} />
        </Center>

        <Button title="Voltar para o login" variant="outline" mt={12} onPress={handleGoBack} />
      </VStack>
    </ScrollView>
  )
}