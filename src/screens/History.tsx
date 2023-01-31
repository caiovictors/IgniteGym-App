import { useState } from "react";
import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Heading, VStack, SectionList, Text } from "native-base";

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '30.01.23',
      data: ['Puxada frontal', 'Remada unilateral']
    },
    {
      title: '29.01.23',
      data: ['Puxada frontal']
    },
  ])
  return (
    <VStack flex={1}>
      <ScreenHeader title='Histórico de exercícios' />
      <SectionList
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3} fontFamily="heading">
            {title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não há exercícios registrados ainda. {'\n'}
            Vamos fazer exercícios hoje?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  )
}