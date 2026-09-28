import { useQuery } from '@tanstack/react-query'

import { Box, ModalHeader, Text, WithQuery } from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

function ContentModal({
  onClose,
  data: { url }
}: {
  onClose: () => void
  data: {
    url: string
  }
}) {
  const contentQuery = useQuery(
    forgeAPI.getContent
      .input({
        url
      })
      .queryOptions()
  )

  return (
    <Box minWidth="60vw">
      <ModalHeader icon="tabler:news" title="View Article" onClose={onClose} />
      <WithQuery query={contentQuery}>
        {content => (
          <>
            <Text as="h1" mb="sm" size="3xl" weight="semibold">
              {content.title}
            </Text>
            <Text as="p" color="muted" mb="xl">
              {content.time}
            </Text>
            <Box
              className="news-article"
              dangerouslySetInnerHTML={{
                __html: content.content
              }}
            />
          </>
        )}
      </WithQuery>
    </Box>
  )
}

export default ContentModal
