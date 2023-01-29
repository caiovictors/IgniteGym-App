import { TouchableOpacity } from "react-native";
import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'
import { UserPhoto } from "./UserPhoto";

export function HomeHeader() {
  return (
    <HStack bgColor="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto source={{ uri: 'https://github.com/caiovictors.png' }} size={16} alt="Imagem do usuário" mr={3} />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">Olá, </Text>
        <Heading color="gray.100" fontSize="md">Caio Victor</Heading>
      </VStack>
      <TouchableOpacity >
        <Icon as={MaterialIcons} name="logout" size={7} color="gray.200" />
      </TouchableOpacity>
    </HStack>
  )
}