import { TouchableOpacity } from "react-native";
import { Heading, HStack, Icon, Text, VStack } from "native-base";

import { MaterialIcons } from '@expo/vector-icons'

import { useAuth } from "@hooks/useAuth";

import defaultUserPhotoImg from '@assets/userPhotoDefault.png'
import { UserPhoto } from "./UserPhoto";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function HomeHeader() {
  const { user, signOut } = useAuth()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoToProfile() {
    navigation.navigate("profile")
  }

  return (
    <HStack bgColor="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <TouchableOpacity onPress={handleGoToProfile}>
        <UserPhoto source={user.avatar ? { uri: user.avatar } : defaultUserPhotoImg} size={16} alt="Imagem do usuário" mr={3} />
      </TouchableOpacity>
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">Olá, </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">{user.name}</Heading>
      </VStack>
      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" size={7} color="gray.200" />
      </TouchableOpacity>
    </HStack>
  )
}