import { Box, Card, Icon, Text, surface, useModalStore } from '@lifeforge/ui'

import type { NewsArticle } from '..'
import ContentModal from './ContentModal'

function ArticleItem({ item }: { item: NewsArticle }) {
  const { open } = useModalStore()

  return (
    <Card
      isInteractive
      as="article"
      align="center"
      direction={{ base: 'column', md: 'row' }}
      gap="lg"
    >
      <Box
        aspectRatio="16 / 9"
        bg={surface.light}
        flexShrink="0"
        overflow="hidden"
        position="relative"
        r="lg"
        width={{ base: '100%', md: '24rem' }}
      >
        <Icon
          color={{ base: 'bg-300', dark: 'bg-700' }}
          icon="tabler:news"
          position="absolute"
          size="4rem"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
        {item.image && (
          <img
            alt=""
            referrerPolicy="no-referrer"
            src={item.image}
            style={{
              height: '100%',
              objectFit: 'cover',
              position: 'relative',
              width: '100%'
            }}
          />
        )}
      </Box>
      <Box width="100%">
        <Text as="p" color="primary" mb="sm" size="lg" weight="semibold">
          {item.category}
        </Text>
        <Text as="h3" size="2xl" weight="semibold">
          {item.title}
        </Text>
        <Text
          as="p"
          color={{ base: 'bg-600', dark: 'bg-400' }}
          lineClamp={3}
          mt="md"
        >
          {item.excerpt}
        </Text>
        <Text as="p" color="muted" mt="md">
          {item.time_display}
        </Text>
      </Box>
      <Box
        as="button"
        inset="0"
        position="absolute"
        r="xl"
        onClick={() => {
          open(ContentModal, {
            url: item.link
          })
        }}
      />
    </Card>
  )
}

export default ArticleItem
