import { HomeHeader } from "@components/HomeHeader";
import { Center, Text } from "native-base";

export function Home() {
  return (
    <Center flex={1}>
      <HomeHeader />
    </Center>
  )
}