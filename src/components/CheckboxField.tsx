import { Flex, Text } from '@chakra-ui/react'

interface CheckboxFieldProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}

export default function CheckboxField({ checked, onChange, label }: CheckboxFieldProps) {
  return (
    <label style={{ cursor: 'pointer' }}>
      <Flex
        align="center"
        gap={2}
        bg="gray.100"
        px={4}
        py={2}
        borderRadius="md"
        _hover={{ bg: 'gray.200' }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          style={{
            width: '20px',
            height: '20px',
            cursor: 'pointer',
            accentColor: 'var(--chakra-colors-purple-500)',
          }}
        />
        <Text fontWeight="500">{label}</Text>
      </Flex>
    </label>
  )
}
