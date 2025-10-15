import { Box, Button, Dialog, Field, Flex, Heading, Input, Stack, Textarea } from '@chakra-ui/react'
import { useId, useState } from 'react'
import type { Flashcard } from '../types/flashcard'

interface AddCardFormProps {
  onAddCard: (card: Omit<Flashcard, 'id'>) => void
  onClose: () => void
}

export default function AddCardForm({ onAddCard, onClose }: AddCardFormProps) {
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [category, setCategory] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categoryId = useId()
  const frontId = useId()
  const backId = useId()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (front.trim() && back.trim() && category.trim()) {
      setIsSubmitting(true)

      // Create GitHub Issue URL
      const repoUrl = 'https://github.com/shmorish/anki'
      const issueUrl = `${repoUrl}/issues/new?template=add-flashcard.yml&title=[CARD]%20${encodeURIComponent(category.trim())}&category=${encodeURIComponent(category.trim())}&front=${encodeURIComponent(front.trim())}&back=${encodeURIComponent(back.trim())}`

      // Open GitHub Issue in new tab
      window.open(issueUrl, '_blank')

      // Also add locally for immediate feedback
      onAddCard({
        front: front.trim(),
        back: back.trim(),
        category: category.trim(),
      })

      setFront('')
      setBack('')
      setCategory('')
      setIsSubmitting(false)
      onClose()
    }
  }

  return (
    <Dialog.Root open={true} onOpenChange={(e) => !e.open && onClose()}>
      <Dialog.Backdrop bg="blackAlpha.500" />
      <Dialog.Positioner>
        <Dialog.Content borderRadius="16px" p={8} mx={4} maxW="lg">
          <Dialog.Body p={0}>
            <Heading size="lg" mb={6} color="gray.700">
              Add New Flashcard
            </Heading>
            <Box as="form" onSubmit={handleSubmit}>
              <Stack gap={6} align="stretch">
                <Field.Root required>
                  <Field.Label htmlFor={categoryId} color="gray.600" fontWeight="600">
                    Category
                  </Field.Label>
                  <Input
                    id={categoryId}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Programming, Math, History"
                    size="lg"
                    borderColor="gray.300"
                  />
                </Field.Root>

                <Field.Root required>
                  <Field.Label htmlFor={frontId} color="gray.600" fontWeight="600">
                    Question (Front)
                  </Field.Label>
                  <Textarea
                    id={frontId}
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                    placeholder="Enter the question..."
                    rows={3}
                    size="lg"
                    borderColor="gray.300"
                    resize="vertical"
                  />
                </Field.Root>

                <Field.Root required>
                  <Field.Label htmlFor={backId} color="gray.600" fontWeight="600">
                    Answer (Back)
                  </Field.Label>
                  <Textarea
                    id={backId}
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
                    placeholder="Enter the answer..."
                    rows={3}
                    size="lg"
                    borderColor="gray.300"
                    resize="vertical"
                  />
                </Field.Root>

                <Flex gap={4} justify="flex-end" mt={4}>
                  <Button
                    onClick={onClose}
                    disabled={isSubmitting}
                    size="lg"
                    bg="gray.100"
                    color="gray.600"
                    _hover={{ bg: 'gray.200' }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    colorPalette="purple"
                    size="lg"
                    boxShadow="md"
                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                    _active={{ transform: 'translateY(0)' }}
                  >
                    {isSubmitting ? 'Creating Issue...' : 'Add Card'}
                  </Button>
                </Flex>
              </Stack>
            </Box>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
