import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import type { InferOutput } from '@lifeforge/api'
import {
  EmptyStateScreen,
  ModuleHeader,
  Pagination,
  Stack,
  WithQuery
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'
import type { Category } from '@/providers/CategoryProvider'
import { CategoryProvider, useCategories } from '@/providers/CategoryProvider'

import ArticleItem from './components/ArticleItem'
import CategorySelector from './components/CategorySelector'
import './index.css'

const CUSTOM_MAX_PAGE = {
  hot: 10
}

export type NewsArticle = InferOutput<typeof forgeAPI.list>[number]

function SinChewDailyContent() {
  const [page, setPage] = useState(1)
  const { fullCategory, range, shouldShowEmptyState } = useCategories()

  const newsListQuery = useQuery(
    forgeAPI.list
      .input({
        type: fullCategory as Category,
        page: page.toString(),
        range
      })
      .queryOptions({
        enabled: !shouldShowEmptyState
      })
  )

  useEffect(() => {
    setPage(1)
  }, [fullCategory, range])

  return (
    <>
      <ModuleHeader />
      <CategorySelector />
      {shouldShowEmptyState ? (
        <EmptyStateScreen
          icon="tabler:folder-question"
          message={{
            id: 'subcategory'
          }}
        />
      ) : (
        <WithQuery query={newsListQuery}>
          {newsList => (
            <>
              <Stack my="lg">
                {newsList.map(item => (
                  <ArticleItem key={item.id} item={item} />
                ))}
              </Stack>
              <Pagination
                mb="xl"
                page={page}
                totalPages={
                  fullCategory in CUSTOM_MAX_PAGE
                    ? CUSTOM_MAX_PAGE[
                        fullCategory as keyof typeof CUSTOM_MAX_PAGE
                      ]
                    : 30
                }
                onPageChange={setPage}
              />
            </>
          )}
        </WithQuery>
      )}
    </>
  )
}

function SinChewDaily() {
  return (
    <CategoryProvider>
      <SinChewDailyContent />
    </CategoryProvider>
  )
}

export default SinChewDaily
