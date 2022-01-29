import { Actionsheet, Box, Pressable, Text, useDisclose } from 'native-base';
import React from 'react';
import { ISoundItem } from '../constants/sounds';

interface Props {
  name: string;
  variants: ISoundItem[];
}

const SoundItem = ({ variants, name }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <Box>
      <Pressable onLongPress={() => onOpen()}>
        <Box px={2} py={4} bg="white" my={2}>
          <Text>{name}</Text>
        </Box>
      </Pressable>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="3xl"
              color="gray.500"
              _dark={{
                color: 'gray.300',
              }}
            >
              Variants selection
            </Text>
          </Box>
          {variants.map(v => (
            <Actionsheet.Item key={v.variantName}>{v.variantName}</Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

export default SoundItem;
